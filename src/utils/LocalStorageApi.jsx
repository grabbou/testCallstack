import firstBy from 'thenby';
const DELAY = 100;

function getItems(url, defaultItems) {
    if (!localStorage.getItem(url)) {
        localStorage.setItem(url, JSON.stringify(defaultItems));
    }

    return JSON.parse(localStorage.getItem(url));
}

function makeSearch(params) {
    return (item) => {
        let add = true;

        if (params) {
            for (const key in params) {
                if (params[key] && item[key]) {
                    const match = new RegExp(params[key], 'i');
                    add = add && match.test(item[key]);
                }
            }
        }

        return add;
    };
}

function getOnePage(items, page, perPage) {
    const offset = (page - 1) * perPage;
    return items.slice(offset, offset + perPage);
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function Api(url, defaultItems = []) {
    this.create = (data) => new Promise((resolve) => {
        setTimeout(() => {
            const newItem = { ...data, id: guid(), createdAt: new Date(2016, 9, 1) };

            const items = getItems(url, defaultItems);

            items.push(newItem);
            localStorage.setItem(url, JSON.stringify(items));

            resolve(newItem);
        }, DELAY);
    });

    this.getPage = (filter, sort, page = 1, perPage = 10) => {
        let items = getItems(url, defaultItems);

        items = items.filter(makeSearch(filter));

        if (sort) {
            items.sort(
                firstBy(sort.field, {
                    ignoreCase: true,
                    direction: sort.direction === 'asc' ? 1 : -1,
                })
            );
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    items: getOnePage(items, page, perPage),
                    count: items.length,
                });
            }, DELAY);
        });
    };
}

export default Api;

