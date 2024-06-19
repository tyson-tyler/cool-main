import Mux from "@mux/mux-node";
import MuxUploader from "@mux/mux-uploader-react";

const mux = new Mux();

export default async function Page() {
  const directUpload = await mux.video.uploads.create({
    new_asset_settings: {
      playback_policy: ["public"],
      encoding_tier: "baseline",
    },
    cors_origin: "*",
  });
  return <MuxUploader endpoint={directUpload.url} />;
}
