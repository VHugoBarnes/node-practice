// Puerto
process.env.PORT = process.env.PORT || 3000;

// Vencimiento del token
// 60 segs * 60 mins * 24 hrs * 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// Seed del token
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

// Google client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '793329611042-4fjqfc6g6coc8dnnvicr029p3r3um9cd.apps.googleusercontent.com';