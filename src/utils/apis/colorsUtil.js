
function hexToRgba(hex, alpha) {
  const hexColor = hex.replace('#', '');
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function rgbaOpacity(rgbaColor, newOpacity) {
  const rgbaParts = rgbaColor.match(/\d+(\.\d+)?/g);
  if (rgbaParts && rgbaParts.length >= 4) {
    const [r, g, b, _] = rgbaParts;
    const updatedRgbaColor = `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
    return updatedRgbaColor;
  }
  return rgbaColor; // Trả về màu ban đầu nếu không thể chuyển đổi
}


export {hexToRgba, rgbaOpacity};
