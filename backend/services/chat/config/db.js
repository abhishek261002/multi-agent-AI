import dns from "node:dns";
import mongoose from "mongoose";

const PUBLIC_DNS_FALLBACK = ["1.1.1.1", "8.8.8.8"];

const isSrvDnsError = (error) =>
  error?.code === "ECONNREFUSED" && error?.syscall === "querySrv";

const getMongoUri = () => {
  const mongoUri = process.env.MONGODB_URI?.trim();

  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI is not set. Add an Atlas mongodb+srv:// URI or a standard mongodb:// seed list URI."
    );
  }

  return mongoUri;
};

const getDnsFallbackServers = () => {
  const configuredServers = process.env.MONGODB_DNS_SERVERS?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  return configuredServers?.length ? configuredServers : PUBLIC_DNS_FALLBACK;
};

const connectWithMongo = async (mongoUri) => {
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });
};

const buildSrvFallbackError = (error) =>
  new Error(
    "MongoDB Atlas SRV lookup failed even after retrying with explicit DNS servers. If your network blocks SRV records, switch to Atlas' standard mongodb:// seed list connection string.",
    { cause: error }
  );

const connectDB = async () => {
  const mongoUri = getMongoUri();

  try {
    await connectWithMongo(mongoUri);
    console.log("DB Connected");
    return;
  } catch (error) {
    if (mongoUri.startsWith("mongodb+srv://") && isSrvDnsError(error)) {
      const dnsServers = getDnsFallbackServers();

      console.warn(
        `MongoDB SRV lookup was refused by the current DNS resolver. Retrying with DNS servers: ${dnsServers.join(", ")}`
      );

      dns.setServers(dnsServers);

      try {
        await connectWithMongo(mongoUri);
        console.log("DB Connected");
        return;
      } catch (retryError) {
        throw buildSrvFallbackError(retryError);
      }
    }

    throw error;
  }
};

export default connectDB;
