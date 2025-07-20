import css from "./PhoneticMenu.module.css";
import videoData from "../data/PhoneticsVideoData.json";

const PhoneticMenu = () => {
  return (
    <nav className={css.menu}>
      {videoData.map((video) => (
        <a key={video.id} href={`#video-${video.id}`} className={css.menuItem}>
          {video.phoneme}
        </a>
      ))}
    </nav>
  );
};

export default PhoneticMenu;

