// // import React from "react";
// import css from "./PhonemeHighlighter.module.css";
// import PropTypes from "prop-types";
// /**
//  * @param {Object} props
//  * @param {string} props.text — текст мнемонічної фрази
//  * @param {string[]} props.phonemes — масив фонем для підсвічування
//  */
// const PhonemeHighlighter = ({ text, phonemes }) => {
//   if (!text || !phonemes) return null;

//   // Створюємо regex з усіх фонем
//   const escaped = phonemes.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); // екрануємо спецсимволи
//   const regex = new RegExp(`(${escaped.join("|")})`, "gi");

//   // Розділяємо текст на частини по фонемах
//   const parts = text.split(regex);

//   return (
//     <>
//       {parts.map((part, i) =>
//         phonemes.some((p) => p.toLowerCase() === part.toLowerCase()) ? (
//           <span key={i} className={css.highlight}>
//             {part}
//           </span>
//         ) : (
//           <span key={i}>{part}</span>
//         )
//       )}
//     </>
//   );
// };

// export default PhonemeHighlighter;

// PhonemeHighlighter.propTypes = {
//   text: PropTypes.string.isRequired,
//   phonemes: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

// import React from "react";

import css from "./PhonemeHighlighter.module.css";
import PropTypes from "prop-types";

/**
 * @param {Object} props
 * @param {string} props.text — HTML-розмітка з підсвіченими span
 */
const PhonemeHighlighter = ({ text }) => {
  if (!text) return null;

  return (
    <span className={css.phrase} dangerouslySetInnerHTML={{ __html: text }} />
  );
};

PhonemeHighlighter.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PhonemeHighlighter;
