const LOCAL_URL = 'http://localhost:7777/v1';
const REMOTE_URL = 'https://ribuddy.kyeoungwoon.kr/v1';

export const OAUTH_REGISTER = {
  summary: 'OAuth 사용자 회원가입',
  description: `## v1.0 2025-09-15
\nOAuth로 Login 했을 시에 \`type=register\` 로 응답이 온 사용자 (가입되지 않은 사용자) 가 회원가입을 하기 위한 API 입니다.
\n로그인 시도 시에 제공된 \`registerToken\`을 헤더에 담아 요청해 주세요.
\n`,
};

export const OAUTH_LOGIN = (oauthProvier: string, path: string) => ({
  summary: `${oauthProvier} OAuth Login`,
  description: `## v1.0 2025-09-15
\nOAuth Provider (${oauthProvier}) 측 계정 로그인 페이지로 Redirect 되는 API 입니다.
\n로그인 시에 자동으로 \`${path}/callback\` 으로 Redirect 됩니다.
\nCallback URI는 FE에서 직접 접근하지 않습니다.
\n[LOCAL](${LOCAL_URL}${path}) [REMOTE](${REMOTE_URL}${path})`,
});

export const OAUTH_CALLBACK = (oauthProvier: string) => ({
  summary: `${oauthProvier} OAuth Callback`,
  description: `## v1.0 2025-09-15
\nQuery String으로 OAuth Provider (${oauthProvier}) 가 제공한 Authorization Code를 첨부해 주세요.
\n* Application 환경에서의 지원을 위한 API 입니다. Web 환경에서는 직접 접근할 필요가 없는 API 입니다.`,
});
