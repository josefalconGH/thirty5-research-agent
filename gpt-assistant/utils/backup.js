// PURPOSE: create backup files with a timestamp in the filename
import fs from 'fs/promises';
import path from 'path';

export async function backupFile(filePath) {
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 15);
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);

  const backupName = `${base}.backup-${timestamp}${ext}`;
  const backupPath = path.join(dir, backupName);

  const content = await fs.readFile(filePath, 'utf-8');
  await fs.writeFile(backupPath, content);

  console.log(`🗂️  Backup saved as ${backupName}`);
}