const express = require('express');
const cors = require('cors');
const app = express();

// CORS 설정
app.use(cors({
  origin: 'http://34.64.82.226', // 클라이언트 도메인
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ... 기존 코드 ... 