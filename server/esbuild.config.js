import esbuild from 'esbuild';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const buildOptions = {
  entryPoints: ['api.js'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  outfile: 'dist/api.js',
  sourcemap: !isProduction,
  minify: isProduction,
  treeShaking: true,
  external: [],
  logLevel: 'info',
  define: {
    'import.meta.url': '"file:///app/api.js"'
  }
};

async function build() {
  try {
    console.log('🔨 开始构建后端服务...');

    await esbuild.build(buildOptions);

    console.log('✅ 构建完成');
    console.log('📦 输出目录: dist/');

    copyConfigFiles();
  } catch (error) {
    console.error('❌ 构建失败:', error);
    process.exit(1);
  }
}

function copyConfigFiles() {
  const distDir = 'dist';
  
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }

  const filesToCopy = ['.env', '.env.example'];
  
  filesToCopy.forEach(file => {
    const sourcePath = join(process.cwd(), file);
    const destPath = join(distDir, file);
    
    if (existsSync(sourcePath)) {
      copyFileSync(sourcePath, destPath);
      console.log(`📄 已复制: ${file}`);
    }
  });
}

build();
