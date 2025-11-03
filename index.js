const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuration
const TOKEN = 'MTQwODk1NTc0MjcxMDM5OTA0OA.Gfq0Jg.Yon22qClosF8gS4stlix0K-SNS_l5aqm6Fq2tk'; 
const WELCOME_CHANNEL_ID = '1434995904561152100';
const GOODBYE_CHANNEL_ID = '1434995904561152100'; // Même salon ou un autre

// Créer le client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// Fonction pour créer la bannière de bienvenue style HACKING/GAMING
async function createWelcomeBanner(member) {
    const canvas = createCanvas(1200, 400);
    const ctx = canvas.getContext('2d');

    // Fond noir avec dégradé cyber
    const gradient = ctx.createLinearGradient(0, 0, 1200, 400);
    gradient.addColorStop(0, '#0a0e14');
    gradient.addColorStop(0.5, '#1a1f2e');
    gradient.addColorStop(1, '#0a0e14');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 400);

    // Grille cyber
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 400; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1200, i);
        ctx.stroke();
    }
    for (let i = 0; i < 1200; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 400);
        ctx.stroke();
    }

    // Code Matrix en arrière-plan
    ctx.fillStyle = 'rgba(0, 255, 65, 0.05)';
    ctx.font = '14px Courier New';
    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 1200;
        const y = Math.random() * 400;
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, x, y);
    }

    // Hexagones cyber
    ctx.strokeStyle = 'rgba(255, 0, 85, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        const x = 200 + i * 400;
        const y = 100 + i * 100;
        const size = 60;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
            const angle = (Math.PI / 3) * j;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Avatar avec effet néon
    const avatarURL = member.user.displayAvatarURL({ extension: 'png', size: 256 });
    const avatar = await loadImage(avatarURL);

    ctx.save();
    ctx.beginPath();
    ctx.arc(180, 200, 115, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 255, 65, 0.2)';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(180, 200, 108, 0, Math.PI * 2);
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(180, 200, 100, 0, Math.PI * 2);
    ctx.strokeStyle = '#ff0055';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(180, 200, 95, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 85, 105, 190, 190);
    ctx.restore();

    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(180, 200, 108, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Texte style terminal
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#00ff41';
    ctx.font = 'bold 32px "Courier New", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('> BIENVENUE_DANS_LE_SERVEUR', 340, 130);
    
    ctx.fillStyle = 'rgba(255, 0, 85, 0.7)';
    ctx.fillText('> BIENVENUE_DANS_LE_SERVEUR', 342, 132);

    // FVL avec effet cyber
    ctx.shadowColor = '#ff0055';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#00ffff';
    ctx.font = 'bold 80px Impact, sans-serif';
    ctx.fillText('[ FVL ]', 340, 210);
    
    ctx.fillStyle = 'rgba(255, 0, 85, 0.8)';
    ctx.fillText('[ FVL ]', 344, 214);
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeText('[ FVL ]', 340, 210);

    // Ligne décorative
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#00ff41';
    ctx.font = '20px "Courier New", monospace';
    ctx.fillText('━━━━━━━━━━━━━━━━━━━━━━━━', 340, 235);

    // Nom du membre
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Courier New", monospace';
    const username = member.user.username.toUpperCase();
    ctx.fillText(`USER:// ${username}`, 340, 285);
    
    ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
    ctx.fillText(`USER:// ${username}`, 342, 287);

    // Status CONNECTED
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#00ff41';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('[✓] CONNECTED', 340, 315);

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Particules néon
    ctx.fillStyle = '#00ff41';
    for (let i = 0; i < 25; i++) {
        const x = Math.random() * 1200;
        const y = Math.random() * 400;
        const size = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = '#00ffff';
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * 1200;
        const y = Math.random() * 400;
        const size = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    return canvas.toBuffer('image/png');
}

// Fonction pour créer la bannière de départ
async function createGoodbyeBanner(member) {
    const canvas = createCanvas(1200, 400);
    const ctx = canvas.getContext('2d');

    // Fond noir/rouge avec dégradé sombre
    const gradient = ctx.createLinearGradient(0, 0, 1200, 400);
    gradient.addColorStop(0, '#1a0a0a');
    gradient.addColorStop(0.5, '#2e1a1a');
    gradient.addColorStop(1, '#1a0a0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 400);

    // Grille cyber rouge
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 400; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1200, i);
        ctx.stroke();
    }
    for (let i = 0; i < 1200; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 400);
        ctx.stroke();
    }

    // Code en arrière-plan
    ctx.fillStyle = 'rgba(255, 0, 0, 0.05)';
    ctx.font = '14px Courier New';
    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 1200;
        const y = Math.random() * 400;
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, x, y);
    }

    // Hexagones rouges
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        const x = 200 + i * 400;
        const y = 100 + i * 100;
        const size = 60;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
            const angle = (Math.PI / 3) * j;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Avatar avec effet rouge
    const avatarURL = member.user.displayAvatarURL({ extension: 'png', size: 256 });
    const avatar = await loadImage(avatarURL);

    ctx.save();
    ctx.beginPath();
    ctx.arc(180, 200, 115, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(180, 200, 108, 0, Math.PI * 2);
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(180, 200, 100, 0, Math.PI * 2);
    ctx.strokeStyle = '#aa0000';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(180, 200, 95, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 85, 105, 190, 190);
    ctx.restore();

    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(180, 200, 108, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Texte style terminal
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 32px "Courier New", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('> USER_HAS_LEFT_THE_SERVER', 340, 130);
    
    ctx.fillStyle = 'rgba(150, 0, 0, 0.7)';
    ctx.fillText('> USER_HAS_LEFT_THE_SERVER', 342, 132);

    // FVL avec effet rouge
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 80px Impact, sans-serif';
    ctx.fillText('[ FVL ]', 340, 210);
    
    ctx.fillStyle = 'rgba(100, 0, 0, 0.8)';
    ctx.fillText('[ FVL ]', 344, 214);
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeText('[ FVL ]', 340, 210);

    // Ligne décorative
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ff0000';
    ctx.font = '20px "Courier New", monospace';
    ctx.fillText('━━━━━━━━━━━━━━━━━━━━━━━━', 340, 235);

    // Nom du membre
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Courier New", monospace';
    const username = member.user.username.toUpperCase();
    ctx.fillText(`USER:// ${username}`, 340, 285);
    
    ctx.fillStyle = 'rgba(255, 68, 68, 0.6)';
    ctx.fillText(`USER:// ${username}`, 342, 287);

    // Status DISCONNECTED
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('[✗] DISCONNECTED', 340, 315);

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Particules rouges
    ctx.fillStyle = '#ff0000';
    for (let i = 0; i < 25; i++) {
        const x = Math.random() * 1200;
        const y = Math.random() * 400;
        const size = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = '#aa0000';
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * 1200;
        const y = Math.random() * 400;
        const size = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    return canvas.toBuffer('image/png');
}

// Bot prêt
client.once('clientReady', () => {
    console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
    console.log(`🎉 Prêt à accueillir les nouveaux membres !`);
});

// Nouveau membre
client.on('guildMemberAdd', async (member) => {
    try {
        console.log(`👋 Nouveau membre: ${member.user.tag}`);

        const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
        
        if (!channel) {
            console.error('❌ Salon introuvable !');
            return;
        }

        const bannerBuffer = await createWelcomeBanner(member);
        const attachment = new AttachmentBuilder(bannerBuffer, { name: 'welcome.png' });
        
        await channel.send({
            content: `🎉 ${member} Bienvenue sur **FVL** !`,
            files: [attachment]
        });

        console.log(`✅ Bienvenue envoyée à ${member.user.tag}`);
    } catch (error) {
        console.error('❌ Erreur:', error);
    }
});

client.on('error', error => console.error('❌ Erreur Discord:', error));
process.on('unhandledRejection', error => console.error('❌ Erreur:', error));

// Membre qui quitte le serveur
client.on('guildMemberRemove', async (member) => {
    try {
        console.log(`👋 Membre parti: ${member.user.tag}`);

        const channel = member.guild.channels.cache.get(GOODBYE_CHANNEL_ID);
        
        if (!channel) {
            console.error('❌ Salon de départ introuvable !');
            return;
        }

        const bannerBuffer = await createGoodbyeBanner(member);
        const attachment = new AttachmentBuilder(bannerBuffer, { name: 'goodbye.png' });
        
        await channel.send({
            content: `😢 **${member.user.username}** a quitté le serveur FVL...`,
            files: [attachment]
        });

        console.log(`✅ Message de départ envoyé pour ${member.user.tag}`);
    } catch (error) {
        console.error('❌ Erreur:', error);
    }
});

client.login(TOKEN);