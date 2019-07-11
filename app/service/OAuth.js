import { AuthSession } from 'expo';
import {AsyncStorage} from "react-native";

const REDIRECT_URL = AuthSession.getRedirectUrl();
console.log('Redirect Url', REDIRECT_URL);

const GITHUB_CONFIG = {
    id: '52c2551c6ed6fbb92e10',
    secret: '74d465d6330fbb27821c565baac95fc67cf98c9e',
};

const GITHUB_SCOPE = [ 'user', 'repo', 'public_repo' ];

function authorize() {
    return (
        `https://github.com/login/oauth/authorize` +
        `?client_id=${GITHUB_CONFIG.id}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
        `&scope=${encodeURIComponent(GITHUB_SCOPE.join(' '))}`
    );
}

async function createToken(code) {
    const url =
        `https://github.com/login/oauth/access_token` +
        `?client_id=${GITHUB_CONFIG.id}` +
        `&client_secret=${GITHUB_CONFIG.secret}` +
        `&code=${code}`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return res.json();
}

async function getToken() {
    try {
        const { type, params } = await AuthSession.startAsync({
            authUrl: authorize(),
        });
        console.log('getGithubTokenAsync: A: ', { type, params });
        if (type !== 'success') {
            await AuthSession.dismiss;
            return null;
        }
        if (params.error) {
            const { error, error_description, error_uri } = params;
            if (error === 'redirect_uri_mismatch') {
                console.warn(
                    `Please set the "Authorization callback URL" in your Github application settings to ${REDIRECT_URL}`
                );
            }
            throw new Error(`Github Auth: ${error} ${error_description}`);
        }
        if (params.code) {
            const result    = await createToken(params.code);
            console.log('Result Token', result);
            await AsyncStorage.setItem('token', result.access_token, '');
            await AuthSession.dismiss;
            return result;
        }
    } catch (e) {
        console.log('Error', e);
    }
}

export default getToken;
