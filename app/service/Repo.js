export default {
    async getRepo(query) {
        try {
            const url =
                `https://api.github.com/search/repositories` +
                `?q=${query}`;
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            return res.json();
        } catch (e) {
            console.log('Error', e);
        }
    },
    async getCommit(fullname) {
        try {
            const url =
                `https://api.github.com/repos/`+ fullname +`/commits`;
            console.log(url);
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            return res.json();
        } catch (e) {
            console.log('Error', e);
        }
    }
}
