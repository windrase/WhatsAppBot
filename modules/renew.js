const axios = require('axios');
const { exec } = require('child_process');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sellvpn.db');

async function renewssh(username, exp, limitip, serverId) {
  console.log(`Renewing SSH account for ${username} with expiry ${exp} days, limit IP ${limitip} on server ${serverId}`);

  // Validasi username
if (!/^[a-z0-9-]+$/.test(username)) {
    return '❌ Username tidak valid. Mohon gunakan hanya huruf dan angka tanpa spasi.';
  }

  return new Promise((resolve) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], (err, server) => {
      if (err || !server) {
        console.error('❌ Error fetching server:', err?.message || 'server null');
        return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
      }

      const domain = server.domain;
      const param = `/vps/renewsshvpn`;
      const web_URL = `http://${domain}${param}`; // Contoh: http://domainmu.com/vps/sshvpn
      const AUTH_TOKEN = server.auth;
      const days = exp;

      const curlCommand = `curl -s -X PATCH "${web_URL}/${username}/${days}" \
-H "Authorization: ${AUTH_TOKEN}" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d '{"kuota": 0}'`;

      exec(curlCommand, (_, stdout) => {
        let d;
        try {
          d = JSON.parse(stdout);
        } catch (e) {
          console.error('❌ Gagal parsing JSON:', e.message);
          console.error('🪵 Output:', stdout);
          return resolve('❌ Format respon dari server tidak valid.');
        }

        if (d?.meta?.code !== 200 || !d.data) {
          console.error('❌ Respons error:', d);
          const errMsg = d?.message || d?.meta?.message || JSON.stringify(d, null, 2);
          return resolve(`❌ Respons error:\n${errMsg}`);
        }

        const s = d.data;
// ======= MULAI LOGIKA UPDATE total_create_akun =======
if (exp >= 3 && exp <= 135) {
  db.run(
    'UPDATE Server SET total_create_akun = total_create_akun + 1 WHERE id = ?',
    [serverId],
    (err) => {
      if (err) {
        console.error('⚠️ Gagal update total_create_akun:', err.message);
      } else {
        console.log(`✅ total_create_akun diperbarui untuk serverId ${serverId} dengan exp ${exp}`);
      }
    }
  );
} else {
  console.log(`⚠️ Exp ${exp} hari tidak dicatat (kurang dari 30 atau lebih dari 135)`);
}
// ======= SELESAI LOGIKA UPDATE =======
        const msg = `✅ *Renew SSH Account Success!*

🔄 *Akun berhasil diperpanjang*
────────────────────────────
👤 *Username*     : \`${s.username}\`
📆 *Masa Aktif*   :
🕒 Dari: \`${s.from}\`
🕒 Sampai: \`${s.to}\`
────────────────────────────

✨ Terima kasih telah memperpanjang layanan kami!
*© Telegram Bots - 2025*`;

        return resolve(msg);
      });
    });
  });
}
async function renewvmess(username, exp, quota, limitip, serverId) {
  console.log(`Renewing VMess account for ${username} with expiry ${exp} days, quota ${quota} GB, limit IP ${limitip}`);

  // Validasi username
if (!/^[a-z0-9-]+$/.test(username)) {
    return '❌ Username tidak valid. Mohon gunakan hanya huruf dan angka tanpa spasi.';
  }

  return new Promise((resolve) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], (err, server) => {
      if (err || !server) {
        console.error('❌ Error fetching server:', err?.message || 'server null');
        return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
      }

      const domain = server.domain;
      const param = `/vps/renewvmess`;
      const web_URL = `http://${domain}${param}`; // contoh: http://domain.com/vps/vmess
      const AUTH_TOKEN = server.auth;
      const days = exp;
      const KUOTA = quota;

      const curlCommand = `curl -s -X PATCH "${web_URL}/${username}/${days}" \
-H "Authorization: ${AUTH_TOKEN}" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d '{"kuota": ${KUOTA}}'`;

      exec(curlCommand, (_, stdout) => {
        let d;
        try {
          d = JSON.parse(stdout);
        } catch (e) {
          console.error('❌ Gagal parsing JSON:', e.message);
          console.error('🪵 Output:', stdout);
          return resolve('❌ Format respon dari server tidak valid.');
        }

        if (d?.meta?.code !== 200 || !d.data) {
          console.error('❌ Respons error:', d);
          const errMsg = d?.message || d?.meta?.message || JSON.stringify(d, null, 2);
          return resolve(`❌ Respons error:\n${errMsg}`);
        }

        const s = d.data;
// ======= MULAI LOGIKA UPDATE total_create_akun =======
if (exp >= 3 && exp <= 135) {
  db.run(
    'UPDATE Server SET total_create_akun = total_create_akun + 1 WHERE id = ?',
    [serverId],
    (err) => {
      if (err) {
        console.error('⚠️ Gagal update total_create_akun:', err.message);
      } else {
        console.log(`✅ total_create_akun diperbarui untuk serverId ${serverId} dengan exp ${exp}`);
      }
    }
  );
} else {
  console.log(`⚠️ Exp ${exp} hari tidak dicatat (kurang dari 30 atau lebih dari 135)`);
}
// ======= SELESAI LOGIKA UPDATE =======
        const msg = `✅ *Renew VMess Account Success!*

🔄 *Akun berhasil diperpanjang*
────────────────────────────
👤 *Username*    : \`${s.username}\`
📦 *Quota*       : \`${s.quota === "0" ? "Unlimited" : s.quota} GB\`
📅 *Masa Aktif*  :
🕒 Dari   : \`${s.from}\`
🕒 Sampai : \`${s.to}\`
────────────────────────────

✨ Terima kasih telah memperpanjang layanan kami!
*© Telegram Bots - 2025*`;

        return resolve(msg);
      });
    });
  });
}
async function renewvless(username, exp, quota, limitip, serverId) {
  console.log(`Renewing VLESS account for ${username} with expiry ${exp} days, quota ${quota} GB, limit IP ${limitip}`);

  // Validasi username
if (!/^[a-z0-9-]+$/.test(username)) {
    return '❌ Username tidak valid. Mohon gunakan hanya huruf dan angka tanpa spasi.';
  }

  return new Promise((resolve) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], (err, server) => {
      if (err || !server) {
        console.error('❌ Error fetching server:', err?.message || 'server null');
        return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
      }

      const domain = server.domain;
      const param = `/vps/renewvless`;
      const web_URL = `http://${domain}${param}`;        // Contoh: http://domain.com/vps/vless
      const AUTH_TOKEN = server.auth;
      const days = exp;
      const KUOTA = quota;

      const curlCommand = `curl -s -X PATCH "${web_URL}/${username}/${days}" \
-H "Authorization: ${AUTH_TOKEN}" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d '{"kuota": ${KUOTA}}'`;

      exec(curlCommand, (_, stdout) => {
        let d;
        try {
          d = JSON.parse(stdout);
        } catch (e) {
          console.error('❌ Gagal parsing JSON:', e.message);
          console.error('🪵 Output:', stdout);
          return resolve('❌ Format respon dari server tidak valid.');
        }

        if (d?.meta?.code !== 200 || !d.data) {
          console.error('❌ Respons error:', d);
          const errMsg = d?.message || d?.meta?.message || JSON.stringify(d, null, 2);
          return resolve(`❌ Respons error:\n${errMsg}`);
        }

        const s = d.data;
// ======= MULAI LOGIKA UPDATE total_create_akun =======
if (exp >= 3 && exp <= 135) {
  db.run(
    'UPDATE Server SET total_create_akun = total_create_akun + 1 WHERE id = ?',
    [serverId],
    (err) => {
      if (err) {
        console.error('⚠️ Gagal update total_create_akun:', err.message);
      } else {
        console.log(`✅ total_create_akun diperbarui untuk serverId ${serverId} dengan exp ${exp}`);
      }
    }
  );
} else {
  console.log(`⚠️ Exp ${exp} hari tidak dicatat (kurang dari 30 atau lebih dari 135)`);
}
// ======= SELESAI LOGIKA UPDATE =======
        const msg = `✅ *Renew VLESS Account Success!*

🔄 *Akun berhasil diperpanjang*
────────────────────────────
👤 *Username*    : \`${s.username}\`
📦 *Quota*       : \`${s.quota === "0" ? "Unlimited" : s.quota} GB\`
📅 *Masa Aktif*  :
🕒 Dari   : \`${s.from}\`
🕒 Sampai : \`${s.to}\`
────────────────────────────

✨ Terima kasih telah memperpanjang layanan kami!
*© Telegram Bots - 2025*`;

        return resolve(msg);
      });
    });
  });
}
async function renewtrojan(username, exp, quota, limitip, serverId) {
  console.log(`Renewing TROJAN account for ${username} with expiry ${exp} days, quota ${quota} GB, limit IP ${limitip}`);

  // Validasi username
if (!/^[a-z0-9-]+$/.test(username)) {
    return '❌ Username tidak valid. Mohon gunakan hanya huruf dan angka tanpa spasi.';
  }

  return new Promise((resolve) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], (err, server) => {
      if (err || !server) {
        console.error('❌ Error fetching server:', err?.message || 'server null');
        return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
      }

      const domain = server.domain;
      const param = `/vps/renewtrojan`;
      const web_URL = `http://${domain}${param}`;         // Contoh: http://domain.com/vps/trojan
      const AUTH_TOKEN = server.auth;
      const days = exp;
      const KUOTA = quota;

      const curlCommand = `curl -s -X PATCH "${web_URL}/${username}/${days}" \
-H "Authorization: ${AUTH_TOKEN}" \
-H "accept: application/json" \
-H "Content-Type: application/json" \
-d '{"kuota": ${KUOTA}}'`;

      exec(curlCommand, (_, stdout) => {
        let d;
        try {
          d = JSON.parse(stdout);
        } catch (e) {
          console.error('❌ Gagal parsing JSON:', e.message);
          console.error('🪵 Output:', stdout);
          return resolve('❌ Format respon dari server tidak valid.');
        }

        if (d?.meta?.code !== 200 || !d.data) {
          console.error('❌ Respons error:', d);
          const errMsg = d?.message || d?.meta?.message || JSON.stringify(d, null, 2);
          return resolve(`❌ Respons error:\n${errMsg}`);
        }

        const s = d.data;
// ======= MULAI LOGIKA UPDATE total_create_akun =======
if (exp >= 3 && exp <= 135) {
  db.run(
    'UPDATE Server SET total_create_akun = total_create_akun + 1 WHERE id = ?',
    [serverId],
    (err) => {
      if (err) {
        console.error('⚠️ Gagal update total_create_akun:', err.message);
      } else {
        console.log(`✅ total_create_akun diperbarui untuk serverId ${serverId} dengan exp ${exp}`);
      }
    }
  );
} else {
  console.log(`⚠️ Exp ${exp} hari tidak dicatat (kurang dari 30 atau lebih dari 135)`);
}
// ======= SELESAI LOGIKA UPDATE =======
        const msg = `✅ *Renew TROJAN Account Success!*

🔄 *Akun berhasil diperpanjang*
────────────────────────────
👤 *Username*    : \`${s.username}\`
📦 *Quota*       : \`${s.quota === "0" ? "Unlimited" : s.quota} GB\`
📅 *Masa Aktif*  :
🕒 Dari   : \`${s.from}\`
🕒 Sampai : \`${s.to}\`
────────────────────────────

✨ Terima kasih telah memperpanjang layanan kami!
*© Telegram Bots - 2025*`;

        return resolve(msg);
      });
    });
  });
}
//create shadowsocks ga ada di potato
  async function renewshadowsocks(username, exp, quota, limitip, serverId) {
    console.log(`Renewing Shadowsocks account for ${username} with expiry ${exp} days, quota ${quota} GB, limit IP ${limitip} on server ${serverId}`);
    
    // Validasi username
  if (!/^[a-z0-9-]+$/.test(username)) {
      return '❌ Username tidak valid. Mohon gunakan hanya huruf dan angka tanpa spasi.';
    }
  
    // Ambil domain dari database
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM Server WHERE id = ?', [serverId], (err, server) => {
        if (err) {
          console.error('Error fetching server:', err.message);
          return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
        }
  
        if (!server) return resolve('❌ Server tidak ditemukan. Silakan coba lagi.');
  
        const domain = server.domain;
        const auth = server.auth;
        const param = `:5888/renewshadowsocks?user=${username}&exp=${exp}&quota=${quota}&iplimit=${limitip}&auth=${auth}`;
        const url = `http://${domain}${param}`;
        axios.get(url)
          .then(response => {
            if (response.data.status === "success") {
              const shadowsocksData = response.data.data;
              const msg = `
  🌟 *RENEW SHADOWSOCKS PREMIUM* 🌟
  
  🔹 *Informasi Akun*
  ┌─────────────────────────────
  │ Username: \`${username}\`
  │ Kadaluarsa: \`${vmessData.exp}\`
  │ Kuota: \`${vmessData.quota}\`
  │ Batas IP: \`${shadowsocksData.limitip} IP\`
  └─────────────────────────────
  ✅ Akun ${username} berhasil diperbarui
  ✨ Selamat menggunakan layanan kami! ✨
  `;
           
                console.log('Shadowsocks account renewed successfully');
                return resolve(msg);
              } else {
                console.log('Error renewing Shadowsocks account');
                return resolve(`❌ Terjadi kesalahan: ${response.data.message}`);
              }
            })
          .catch(error => {
            console.error('Error saat memperbarui Shadowsocks:', error);
            return resolve('❌ Terjadi kesalahan saat memperbarui Shadowsocks. Silakan coba lagi nanti.');
          });
      });
    });
  }

async function renewzivpn(password, exp, iplimit, serverId) {
  console.log(`[RENEW] Renewing ZIVPN: ${password}, Add Exp: ${exp}, ServerID: ${serverId}`);
  return new Promise((resolve) => {
    db.get('SELECT * FROM Server WHERE id = ?', [serverId], async (err, server) => {
      if (err || !server) return resolve('❌ Server tidak ditemukan.');
      
      const curlCommand = `curl -s --connect-timeout 10 "http://${server.domain}:5888/renew/zivpn?password=${password}&exp=${exp}&auth=${server.auth}"`;
      
      exec(curlCommand, async (_, stdout, stderr) => {
        if (stderr && !stdout) return resolve('❌ Gagal koneksi ke server.');
        let d;
        try { d = JSON.parse(stdout); } catch (e) { return resolve('❌ Respon server invalid.'); }
        
        if (d.status !== "success") return resolve(`❌ Gagal Renew: ${d.message}`);
        
        return resolve(`✅ *Renew ZIVPN Sukses!*\n🔑 Pass: \`${password}\`\n➕ Tambah: ${exp} Hari`);
      });
    });
  });
}

module.exports = { renewssh, renewvmess, renewvless, renewtrojan, renewshadowsocks, renewzivpn };
