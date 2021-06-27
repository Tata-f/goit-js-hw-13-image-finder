import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"

export const info = Toastify({
    text: "Enter your query",
    className: "info",
    position: "right",
    stopOnFocus: true,
    close: true,
  });