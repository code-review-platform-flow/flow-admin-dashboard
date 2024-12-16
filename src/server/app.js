const express = require('express');
const cors = require('cors');

const app = express();

// CORS 미들웨어를 다른 미들웨어보다 앞에 위치시킵니다
app.use(cors({
  origin: '*', // 테스트를 위해 임시로 모든 도메인 허용
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 모든 라우트에 대해 CORS 헤더 추가
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 기존 라우트 및 미들웨어... 