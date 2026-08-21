import type { ProjectVideo } from "@/lib/types";

export function VideoDemo({ video }: { video: ProjectVideo }) {
  return (
    <figure className="videoDemo">
      <video controls poster={video.poster} preload="metadata">
        <source src={video.src} type="video/mp4" />
        Your browser does not support embedded video.{" "}
        <a href={video.src}>Open the MP4 file.</a>
      </video>
      <figcaption>
        <h3>{video.label}</h3>
        <p>{video.description}</p>
      </figcaption>
    </figure>
  );
}
