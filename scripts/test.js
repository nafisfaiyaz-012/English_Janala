const createElement = (names) => {
  const hudai = names.map((nam) => {
    return `<div class="bg-[#EDF7FF] px-4 py-2 rounded-xl">${nam}</div>`;
  });

  return (hudai.join(' '));
};

const names = ["nafis", "faiyaz", "fahad"];

createElement(names);
