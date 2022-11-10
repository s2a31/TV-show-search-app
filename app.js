const form = document.querySelector('#searchForm');
const container = document.querySelector('.container');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  deleteShows();
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
  makeShows(res.data);
  form.elements.query.value = '';
});

const makeShows = (shows) => {
  for (let result of shows) {
    if (result.show.image && result.show.name) {
      const show = document.createElement('div');
      show.classList.add('show');
      const title = document.createElement('span');
      title.innerText = result.show.name;
      const img = document.createElement('img');
      img.src = result.show.image.medium;

      show.append(img);
      show.append(title);
      container.append(show);
    }
  }
};

const deleteShows = () => {
  if (container.children.length > 0) {
    const shows = document.querySelectorAll('.show');
    for (let show of shows) {
      show.remove();
    }
  }
};