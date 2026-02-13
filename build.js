import { cpSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { scramjetPath } from "@mercuryworkshop/scramjet/path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function copy(src, dest) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  try {
    cpSync(src, dest, { recursive: true });
    console.log(`✓ Copied ${src} → ${dest}`);
  } catch (e) {
    console.error(`✗ Failed: ${e.message}`);
  }
}

// Scramjet - use the official scramjetPath helper
copy(scramjetPath, join(__dirname, "public/scram"));

// BareMux
copy(
  join(__dirname, "node_modules/@mercuryworkshop/bare-mux/dist"),
  join(__dirname, "public/baremux")
);

// Epoxy transport
copy(
  join(__dirname, "node_modules/@mercuryworkshop/epoxy-transport/dist"),
  join(__dirname, "public/epoxy")
);

// Libcurl transport
copy(
  join(__dirname, "node_modules/@mercuryworkshop/libcurl-transport/dist"),
  join(__dirname, "public/libcurl")
);

console.log("\n✓ Build complete! Run: node server.js");
