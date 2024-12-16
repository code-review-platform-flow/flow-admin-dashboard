const express = require('express');
const cors = require('cors');

const app = express();

// CORS 미들웨어 설정
app.use(cors({
  origin: ['http://34.64.82.226', 'http://localhost:3000'], // 허용할 출처를 명시적으로 지정
  credentials: true // 필요한 경우 credentials 활성화
}));

// 기존 라우트 및 미들웨어... 