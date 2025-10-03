const LOCAL_URL = 'http://localhost:7777/v1';
const REMOTE_URL = 'https://ribuddy.kyeoungwoon.kr/v1';

export const OAUTH_REGISTER = {
  summary: 'OAuth 사용자 회원가입',
  description: `## v1.0 2025-09-15
\nOAuth로 Login 했을 시에 \`type=register\` 로 응답이 온 사용자 (가입되지 않은 사용자) 가 회원가입을 하기 위한 API 입니다.
\nOAuth 로그인 시 발급받은 RegisterToken을 이용해서 회원가입을 진행합니다.
\n
\nHeader의 RegisterToken에 OAuth 로그인 시 발급받은 RegisterToken을 **평문** 형태로 넣어서 요청해주세요.
\nOAuth 로그인 Response의 응답에서 \`type: register\`로 왔어야 합니다.
\n`,
};

export const OAUTH_LOGIN = (oauthProvider: string, path: string) => ({
  summary: `${oauthProvider} OAuth Login`,
  description: `## v1.0 2025-09-15
\nOAuth Provider (${oauthProvider}) 측 계정 로그인 페이지로 Redirect 되는 API 입니다.
\n로그인 시에 callback URL인 \`${path}/callback\` 으로 Redirect 됩니다.
\n[LOCAL](${LOCAL_URL}${path}) [REMOTE](${REMOTE_URL}${path})`,
});

export const OAUTH_CALLBACK = (oauthProvider: string) => ({
  summary: `${oauthProvider} OAuth Callback`,
  description: `## v1.0 2025-09-15
\nQuery String으로 OAuth Provider (${oauthProvider}) 가 제공한 Authorization Code를 첨부해 주세요.
\n* Application 환경에서의 지원을 위한 API 입니다. Web 환경에서는 직접 접근할 필요가 없는 API 입니다.`,
});
