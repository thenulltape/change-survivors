// ============================================================
//  CHANGE SURVIVORS v2 — Bullet Heaven
//  Full featured: characters, passives, evolutions, events
// ============================================================

// ==================== CONFIG ====================
const CONFIG = {
    GAME_DURATION: 600,
    WORLD_SIZE: 4000,
    XP_BASE: 8,
    XP_GROWTH: 1.22,
    ENEMY_SPAWN_RATE: 0.8,
    PICKUP_RADIUS: 80,
    INVULN_TIME: 800,
    CHEST_INTERVAL: 55,
    COFFEE_INTERVAL: 40,
    SLA_INTERVAL: 70,
    MILESTONE_KILLS: [100, 300, 500, 1000, 2000],
};

// ==================== CHARACTERS ====================
const CHARACTERS = {
    change_manager: {
        name: 'Change Manager',
        emoji: '👔',
        description: 'Balanced. +20% AOE radius.',
        hp: 120,
        speed: 180,
        startWeapon: 'approve_stamp',
        bonus: { aoeRadius: 1.2 },
    },
    change_support: {
        name: 'Change Support',
        emoji: '🧑‍💼',
        description: 'Fast, fragile. +30% XP gain, +20% speed.',
        hp: 70,
        speed: 235,
        startWeapon: 'approve_stamp',
        bonus: { xpGain: 1.3, speed: 1.2 },
    },
    ops: {
        name: 'OPS',
        emoji: '🎖️',
        description: 'Tanky. Starts with 2 weapons. +30% HP.',
        hp: 155,
        speed: 165,
        startWeapon: 'approve_stamp',
        startWeapon2: 'cr_shield',
        bonus: { hp: 1.3 },
    },
};

// ==================== PASSIVE ITEMS ====================
const PASSIVES = {
    speed_boost: { name: 'Quick Steps', emoji: '👟', description: '+12% movement speed', maxLevel: 5, effect: 'speed', value: 0.12 },
    magnet: { name: 'Magnet Badge', emoji: '🧲', description: '+25% pickup radius', maxLevel: 5, effect: 'pickup', value: 0.25 },
    xp_boost: { name: 'Growth Plan', emoji: '📈', description: '+15% XP gain', maxLevel: 5, effect: 'xp', value: 0.15 },
    dmg_boost: { name: 'Sharp Pen', emoji: '🖊️', description: '+10% all damage', maxLevel: 5, effect: 'damage', value: 0.10 },
    cooldown: { name: 'Espresso Shot', emoji: '☕', description: '-8% all cooldowns', maxLevel: 5, effect: 'cooldown', value: 0.08 },
    max_hp: { name: 'Health Plan', emoji: '💚', description: '+15 max HP', maxLevel: 5, effect: 'maxhp', value: 15 },
    armor: { name: 'Thick Skin', emoji: '🦺', description: '+5% damage reduction', maxLevel: 5, effect: 'armor', value: 0.05 },
    projectile_speed: { name: 'Fast Track', emoji: '⚡', description: '+12% projectile speed', maxLevel: 5, effect: 'projspeed', value: 0.12 },
};

// ==================== WEAPON DEFINITIONS ====================
const WEAPONS = {
    approve_stamp: {
        name: 'Approve', emoji: '✅',
        description: 'Fires approval stamps toward enemies',
        baseDamage: 10, baseInterval: 800, baseCount: 2, baseSpeed: 320, baseRange: 250,
        maxLevel: 8, type: 'aimed',
        evolvesWith: 'cooldown', evolvesInto: 'bulk_approve',
        upgrades: ['+1 projectile','+25% damage','+1 projectile','-20% cooldown','+1 projectile','+35% damage','+2 projectiles','FINAL: Double fire rate'],
    },
    rollback: {
        name: 'Layout Change', emoji: '📐',
        description: 'Pushes back enemies and damages them',
        baseDamage: 18, baseInterval: 2200, baseCount: 1, baseSpeed: 0, baseRange: 140,
        maxLevel: 8, type: 'aoe',
        evolvesWith: 'dmg_boost', evolvesInto: 'total_restructure',
        upgrades: ['+25% radius','+30% damage','+25% radius','-20% cooldown','+40% damage','+25% radius','Stuns 0.5s','FINAL: Double radius'],
    },
    canary: {
        name: 'Add Correspondence', emoji: '📨',
        description: 'Orbiting letters that damage on contact',
        baseDamage: 14, baseInterval: 0, baseCount: 2, baseSpeed: 3.5, baseRange: 90,
        maxLevel: 8, type: 'orbit',
        evolvesWith: 'speed_boost', evolvesInto: 'mail_storm',
        upgrades: ['+1 letter','+20% damage','+1 letter','+15% speed','+1 letter','+40% damage','+2 letters','FINAL: Explode on hit'],
    },
    pipeline: {
        name: 'Request for Info', emoji: '❓',
        description: 'Fires beams toward nearest enemies',
        baseDamage: 7, baseInterval: 120, baseCount: 1, baseSpeed: 550, baseRange: 280,
        maxLevel: 8, type: 'beam',
        evolvesWith: 'projectile_speed', evolvesInto: 'interrogation',
        upgrades: ['+1 beam','+20% damage','+30% range','-20% interval','+1 beam','+40% damage','Pierce 3','FINAL: Chain effect'],
    },
    cr_shield: {
        name: 'Change Support', emoji: '🛡️',
        description: 'Damage reduction and HP regen',
        baseDamage: 0, baseInterval: 0, baseCount: 1, baseSpeed: 0, baseRange: 50,
        maxLevel: 8, type: 'passive',
        evolvesWith: 'armor', evolvesInto: 'fortress',
        upgrades: ['+10% DR','+0.5 HP/s','+10% DR','+1 HP/s','+15% DR','+1.5 HP/s','Thorns 20','FINAL: 50% DR'],
    },
    ticket_storm: {
        name: 'REJECT!', emoji: '❌',
        description: 'Rains rejections on random enemies',
        baseDamage: 30, baseInterval: 1500, baseCount: 3, baseSpeed: 0, baseRange: 350,
        maxLevel: 8, type: 'rain',
        evolvesWith: 'xp_boost', evolvesInto: 'mass_rejection',
        upgrades: ['+1 stamp','+25% damage','+2 stamps','-20% cooldown','+2 stamps','+30% damage','+3 stamps','FINAL: Burn zones'],
    },
};

// ==================== EVOLVED WEAPONS ====================
const EVOLVED_WEAPONS = {
    bulk_approve: { name: 'Bulk Approve', emoji: '✅✅', description: 'Fires burst of 10 stamps at once', type: 'aimed', baseDamage: 15, baseInterval: 600, baseCount: 10, baseSpeed: 400, baseRange: 300 },
    total_restructure: { name: 'Total Restructure', emoji: '🌀', description: 'Massive AOE + freeze all', type: 'aoe', baseDamage: 40, baseInterval: 1800, baseCount: 1, baseSpeed: 0, baseRange: 350 },
    mail_storm: { name: 'Mail Storm', emoji: '📧', description: '10 fast orbiting mails', type: 'orbit', baseDamage: 22, baseInterval: 0, baseCount: 10, baseSpeed: 5, baseRange: 130 },
    interrogation: { name: 'Interrogation', emoji: '⁉️', description: 'Rapid piercing beams', type: 'beam', baseDamage: 12, baseInterval: 80, baseCount: 3, baseSpeed: 700, baseRange: 350 },
    fortress: { name: 'Fortress', emoji: '🏰', description: '60% DR, 3 HP/s, thorns 40', type: 'passive', baseDamage: 0, baseInterval: 0, baseCount: 1, baseSpeed: 0, baseRange: 50 },
    mass_rejection: { name: 'Mass Rejection', emoji: '🚫', description: 'Massive rain + permanent fire', type: 'rain', baseDamage: 50, baseInterval: 1000, baseCount: 15, baseSpeed: 0, baseRange: 450 },
};

// ==================== ENEMY DEFINITIONS ====================
const ENEMY_TYPES = {
    cr_request: { name: 'Change Request', emoji: '📝', hp: 18, speed: 70, damage: 5, xp: 1, size: 14, color: '#3b82f6' },
    approval_pending: { name: 'Pending Approval', emoji: '⏳', hp: 30, speed: 55, damage: 8, xp: 2, size: 16, color: '#f59e0b' },
    pipeline_fail: { name: 'On Hold!', emoji: '⛔', hp: 45, speed: 80, damage: 12, xp: 3, size: 15, color: '#ef4444' },
    merge_conflict: { name: 'Layout', emoji: '📋', hp: 70, speed: 50, damage: 15, xp: 4, size: 18, color: '#8b5cf6' },
    sev2_alarm: { name: 'Reminder!', emoji: '🔔', hp: 40, speed: 110, damage: 10, xp: 3, size: 14, color: '#dc2626' },
    tech_debt: { name: 'GBS!', emoji: '💀', hp: 130, speed: 40, damage: 20, xp: 6, size: 22, color: '#6b21a8' },
    change_freeze: { name: 'ASANA INTAKE', emoji: '📥', hp: 700, speed: 30, damage: 30, xp: 50, size: 40, color: '#0ea5e9', isBoss: true },
    prod_outage: { name: 'APPROVAL PLAN', emoji: '📜', hp: 1200, speed: 40, damage: 40, xp: 80, size: 48, color: '#991b1b', isBoss: true },
    // Escalation mini-bosses
    escalation: { name: 'ESCALATION', emoji: '⬆️', hp: 300, speed: 55, damage: 25, xp: 30, size: 28, color: '#d946ef', isBoss: true },
};

const SPAWN_TABLE = [
    { time: 0, types: ['cr_request'], weight: 10 },
    { time: 20, types: ['approval_pending'], weight: 8 },
    { time: 45, types: ['pipeline_fail'], weight: 7 },
    { time: 70, types: ['sev2_alarm'], weight: 6 },
    { time: 100, types: ['merge_conflict'], weight: 5 },
    { time: 140, types: ['tech_debt'], weight: 4 },
    { time: 90, types: ['change_freeze'], weight: 0, boss: true, interval: 100 },
    { time: 240, types: ['prod_outage'], weight: 0, boss: true, interval: 120 },
];

// ==================== ACHIEVEMENTS ====================
const ACHIEVEMENTS = [
    { id: 'kill_100', name: 'First Batch', desc: 'Resolve 100 requests', check: g => g.kills >= 100 },
    { id: 'kill_500', name: 'Efficiency Expert', desc: 'Resolve 500 requests', check: g => g.kills >= 500 },
    { id: 'kill_1000', name: 'Process Machine', desc: 'Resolve 1000 requests', check: g => g.kills >= 1000 },
    { id: 'survive_5', name: 'Halfway There', desc: 'Survive 5 minutes', check: g => g.time >= 300 },
    { id: 'survive_10', name: 'Fully Approved', desc: 'Survive 10 minutes', check: g => g.time >= 600 },
    { id: 'level_10', name: 'Career Growth', desc: 'Reach level 10', check: g => g.player && g.player.level >= 10 },
    { id: 'level_20', name: 'Senior Role', desc: 'Reach level 20', check: g => g.player && g.player.level >= 20 },
    { id: 'evolve', name: 'Innovator', desc: 'Evolve a weapon', check: g => g.evolvedCount > 0 },
    { id: 'boss_kill', name: 'Escalation Handler', desc: 'Defeat a boss', check: g => g.bossKills > 0 },
    { id: 'all_weapons', name: 'Full Arsenal', desc: 'Have 5+ weapons at once', check: g => g.player && g.player.weapons.length >= 5 },
];

// ==================== GAME STATE ====================
let canvas, ctx;
let game = {
    running: false, paused: false, time: 0, kills: 0, bossKills: 0, evolvedCount: 0,
    player: null, enemies: [], projectiles: [], xpOrbs: [], particles: [],
    damageNumbers: [], fireZones: [], pickups: [], trails: [],
    camera: { x: 0, y: 0 }, keys: {},
    spawnTimer: 0, bossTimers: {}, lastTime: 0,
    screenShake: { intensity: 0, duration: 0 },
    slaTimer: null, slaNextTime: CONFIG.SLA_INTERVAL,
    chestNextTime: CONFIG.CHEST_INTERVAL,
    coffeeNextTime: CONFIG.COFFEE_INTERVAL,
    milestoneIndex: 0, notifications: [],
    achievements: [], unlockedAchievements: JSON.parse(localStorage.getItem('cs_achievements') || '[]'),
    selectedCharacter: null,
    coffeeActive: 0, // remaining seconds of coffee boost
};

// ==================== AUDIO SYSTEM ====================
let audioCtx = null;
function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
function playSound(freq, duration, type = 'square', vol = 0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}
function sfxShoot() { playSound(600 + Math.random() * 200, 0.05, 'square', 0.04); }
function sfxHit() { playSound(200, 0.08, 'sawtooth', 0.06); }
function sfxLevelUp() { playSound(523, 0.1, 'sine', 0.12); setTimeout(() => playSound(659, 0.1, 'sine', 0.12), 100); setTimeout(() => playSound(784, 0.15, 'sine', 0.12), 200); }
function sfxPickup() { playSound(880, 0.06, 'sine', 0.05); }
function sfxBossSpawn() { playSound(100, 0.4, 'sawtooth', 0.15); }
function sfxMilestone() { playSound(440, 0.1, 'sine', 0.15); setTimeout(() => playSound(660, 0.1, 'sine', 0.15), 120); setTimeout(() => playSound(880, 0.15, 'sine', 0.15), 240); setTimeout(() => playSound(1100, 0.2, 'sine', 0.12), 360); }
function sfxAchievement() { playSound(523, 0.12, 'triangle', 0.1); setTimeout(() => playSound(784, 0.12, 'triangle', 0.1), 150); setTimeout(() => playSound(1047, 0.2, 'triangle', 0.1), 300); }

// Background music - simple looping bass
let musicInterval = null;
function startMusic() {
    if (!audioCtx) return;
    let beat = 0;
    const notes = [110, 130, 110, 146, 110, 130, 110, 165];
    musicInterval = setInterval(() => {
        if (game.paused || !game.running) return;
        playSound(notes[beat % notes.length], 0.15, 'triangle', 0.03);
        beat++;
    }, 400);
}
function stopMusic() { if (musicInterval) { clearInterval(musicInterval); musicInterval = null; } }

// ==================== PLAYER CREATION ====================
function createPlayer(charId) {
    const char = CHARACTERS[charId];
    const maxHp = char.hp * (char.bonus.hp || 1);
    const p = {
        x: CONFIG.WORLD_SIZE / 2, y: CONFIG.WORLD_SIZE / 2,
        hp: maxHp, maxHp: maxHp,
        speed: char.speed * (char.bonus.speed || 1),
        level: 1, xp: 0, xpToNext: CONFIG.XP_BASE,
        weapons: [{ id: char.startWeapon, level: 1, timer: 0, evolved: false }],
        passives: {},
        invulnTimer: 0, damageReduction: 0, regen: 0, thorns: 0,
        facingX: 1, facingY: 0,
        // Computed bonuses
        bonusXp: char.bonus.xpGain || 1,
        bonusDamage: 1, bonusCooldown: 1, bonusProjSpeed: 1,
        bonusPickup: 1, bonusAoe: char.bonus.aoeRadius || 1,
        charId: charId, charEmoji: char.emoji,
    };
    if (char.startWeapon2) {
        p.weapons.push({ id: char.startWeapon2, level: 1, timer: 0, evolved: false });
    }
    return p;
}

function recalcPassives() {
    const p = game.player;
    const char = CHARACTERS[p.charId];
    let speed = char.speed * (char.bonus.speed || 1);
    let pickup = 1, xp = char.bonus.xpGain || 1, dmg = 1, cd = 1, ps = 1, maxhp = char.hp * (char.bonus.hp || 1), armor = 0;
    p.bonusAoe = char.bonus.aoeRadius || 1;

    for (const [id, level] of Object.entries(p.passives)) {
        const def = PASSIVES[id];
        if (!def) continue;
        const val = def.value * level;
        switch (def.effect) {
            case 'speed': speed *= (1 + val); break;
            case 'pickup': pickup *= (1 + val); break;
            case 'xp': xp *= (1 + val); break;
            case 'damage': dmg *= (1 + val); break;
            case 'cooldown': cd *= (1 - val); break;
            case 'maxhp': maxhp += def.value * level; break;
            case 'armor': armor += val; break;
            case 'projspeed': ps *= (1 + val); break;
        }
    }
    p.speed = speed;
    p.bonusPickup = pickup;
    p.bonusXp = xp;
    p.bonusDamage = dmg;
    p.bonusCooldown = Math.max(0.3, cd);
    p.bonusProjSpeed = ps;
    if (maxhp !== p.maxHp) { p.hp += (maxhp - p.maxHp); p.maxHp = maxhp; }
    // Armor from passives (additive with weapon DR)
    p.passiveArmor = armor;
}

// ==================== INITIALIZATION ====================
function init() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('keydown', e => {
        game.keys[e.key.toLowerCase()] = true;
        // Escape toggles pause
        if (e.key === 'Escape' && game.running && !game.paused) {
            showPauseMenu();
        }
    });
    window.addEventListener('keyup', e => { game.keys[e.key.toLowerCase()] = false; });
    document.getElementById('restart-btn').addEventListener('click', () => location.reload());
    document.getElementById('pause-btn').addEventListener('click', showPauseMenu);
    document.getElementById('resume-btn').addEventListener('click', resumeGame);
    document.getElementById('quit-btn').addEventListener('click', quitToMenu);
    buildCharacterSelect();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function buildCharacterSelect() {
    const container = document.getElementById('character-choices');
    for (const [id, char] of Object.entries(CHARACTERS)) {
        const card = document.createElement('div');
        card.className = 'char-card';
        const spriteImg = SPRITE_SOURCES[id] ? `<img class="char-sprite" src="${SPRITE_SOURCES[id]}" alt="${char.name}">` : `<div class="char-emoji">${char.emoji}</div>`;
        card.innerHTML = `
            ${spriteImg}
            <div class="char-info">
                <div class="char-name">${char.name}</div>
                <div class="char-desc">${char.description}</div>
                <div class="char-stats">HP: ${char.hp} | SPD: ${char.speed}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            game.selectedCharacter = id;
            startGame(id);
        });
        container.appendChild(card);
    }
}

function startGame(charId) {
    if (!audioCtx) initAudio();
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('pause-btn').classList.remove('hidden');
    game.running = true;
    game.player = createPlayer(charId);
    game.time = 0; game.kills = 0; game.bossKills = 0; game.evolvedCount = 0;
    game.enemies = []; game.projectiles = []; game.xpOrbs = [];
    game.particles = []; game.damageNumbers = []; game.fireZones = [];
    game.pickups = []; game.trails = []; game.notifications = [];
    game.spawnTimer = 0; game.bossTimers = {};
    game.screenShake = { intensity: 0, duration: 0 };
    game.slaTimer = null; game.slaNextTime = CONFIG.SLA_INTERVAL;
    game.chestNextTime = CONFIG.CHEST_INTERVAL;
    game.coffeeNextTime = CONFIG.COFFEE_INTERVAL;
    game.milestoneIndex = 0; game.coffeeActive = 0;
    game.lastTime = performance.now();
    recalcPassives();
    updateHUD();
    updateWeaponIcons();
    startMusic();
    requestAnimationFrame(gameLoop);
}

// ==================== GAME LOOP ====================
function gameLoop(timestamp) {
    if (!game.running) return;
    const rawDt = (timestamp - game.lastTime) / 1000;
    const dt = Math.min(rawDt, 0.05);
    game.lastTime = timestamp;
    if (!game.paused) { game.time += dt; update(dt); }
    render();
    requestAnimationFrame(gameLoop);
}

function update(dt) {
    updatePlayer(dt);
    updateCamera();
    spawnEnemies(dt);
    updateEnemies(dt);
    updateWeapons(dt);
    updateProjectiles(dt);
    updateXpOrbs(dt);
    updatePickups(dt);
    updateParticles(dt);
    updateDamageNumbers(dt);
    updateFireZones(dt);
    updateTrails(dt);
    updateSLA(dt);
    updateEvents(dt);
    updateScreenShake(dt);
    updateNotifications(dt);
    checkCollisions();
    checkMilestones();
    checkAchievements();
    checkVictory();
    updateHUD();
}

// ==================== PLAYER UPDATE ====================
function updatePlayer(dt) {
    const p = game.player;
    let dx = 0, dy = 0;
    if (game.keys['w'] || game.keys['arrowup']) dy -= 1;
    if (game.keys['s'] || game.keys['arrowdown']) dy += 1;
    if (game.keys['a'] || game.keys['arrowleft']) dx -= 1;
    if (game.keys['d'] || game.keys['arrowright']) dx += 1;

    if (dx !== 0 || dy !== 0) {
        const len = Math.sqrt(dx * dx + dy * dy);
        dx /= len; dy /= len;
        p.facingX = dx; p.facingY = dy;
        // Trail
        if (Math.random() < 0.3) {
            game.trails.push({ x: p.x, y: p.y, life: 0.3, maxLife: 0.3, size: 6 });
        }
    }

    p.x += dx * p.speed * dt;
    p.y += dy * p.speed * dt;
    p.x = Math.max(20, Math.min(CONFIG.WORLD_SIZE - 20, p.x));
    p.y = Math.max(20, Math.min(CONFIG.WORLD_SIZE - 20, p.y));
    if (p.invulnTimer > 0) p.invulnTimer -= dt * 1000;
    if (p.regen > 0) p.hp = Math.min(p.maxHp, p.hp + p.regen * dt);
    if (game.coffeeActive > 0) game.coffeeActive -= dt;
}

function updateCamera() {
    game.camera.x = game.player.x - canvas.width / 2;
    game.camera.y = game.player.y - canvas.height / 2;
}

// ==================== TRAILS ====================
function updateTrails(dt) {
    for (let i = game.trails.length - 1; i >= 0; i--) {
        game.trails[i].life -= dt;
        if (game.trails[i].life <= 0) game.trails.splice(i, 1);
    }
}

// ==================== SCREEN SHAKE ====================
function triggerShake(intensity, duration) {
    game.screenShake.intensity = intensity;
    game.screenShake.duration = duration;
}
function updateScreenShake(dt) {
    if (game.screenShake.duration > 0) game.screenShake.duration -= dt;
    else game.screenShake.intensity = 0;
}
function getShakeOffset() {
    if (game.screenShake.intensity <= 0) return { x: 0, y: 0 };
    return {
        x: (Math.random() - 0.5) * game.screenShake.intensity * 2,
        y: (Math.random() - 0.5) * game.screenShake.intensity * 2,
    };
}

// ==================== ENEMY SPAWNING ====================
function spawnEnemies(dt) {
    const elapsed = game.time;
    const spawnInterval = Math.max(0.08, CONFIG.ENEMY_SPAWN_RATE - elapsed * 0.002);
    game.spawnTimer += dt;
    if (game.spawnTimer >= spawnInterval) {
        game.spawnTimer = 0;
        const count = 1 + Math.floor(elapsed / 35);
        for (let i = 0; i < count; i++) spawnOneEnemy();
    }
    for (const entry of SPAWN_TABLE) {
        if (!entry.boss) continue;
        if (elapsed < entry.time) continue;
        const key = entry.types[0];
        if (!game.bossTimers[key]) game.bossTimers[key] = entry.time;
        if (elapsed >= game.bossTimers[key]) {
            spawnBoss(key);
            game.bossTimers[key] += entry.interval;
        }
    }
}

function spawnOneEnemy() {
    const elapsed = game.time;
    const available = SPAWN_TABLE.filter(e => !e.boss && elapsed >= e.time);
    if (!available.length) return;
    const totalWeight = available.reduce((s, e) => s + e.weight, 0);
    let roll = Math.random() * totalWeight;
    let chosen = available[0];
    for (const entry of available) { roll -= entry.weight; if (roll <= 0) { chosen = entry; break; } }
    const typeId = chosen.types[Math.floor(Math.random() * chosen.types.length)];
    const type = ENEMY_TYPES[typeId];
    const pos = getSpawnPosition();
    const scale = 1 + game.time * 0.004;
    game.enemies.push({ ...type, id: typeId, x: pos.x, y: pos.y, hp: type.hp * scale, maxHp: type.hp * scale, currentSpeed: type.speed, stunTimer: 0, isBoss: type.isBoss || false });
}

function spawnBoss(typeId) {
    const type = ENEMY_TYPES[typeId];
    const pos = getSpawnPosition();
    const scale = 1 + game.time * 0.005;
    game.enemies.push({ ...type, id: typeId, x: pos.x, y: pos.y, hp: type.hp * scale, maxHp: type.hp * scale, currentSpeed: type.speed, stunTimer: 0 });
    sfxBossSpawn();
    addNotification('⚠️ BOSS INCOMING!', '#ef4444');
}

function spawnEscalations(x, y) {
    for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 * i) / 3;
        const type = ENEMY_TYPES.escalation;
        const scale = 1 + game.time * 0.004;
        game.enemies.push({
            ...type, id: 'escalation',
            x: x + Math.cos(angle) * 60, y: y + Math.sin(angle) * 60,
            hp: type.hp * scale, maxHp: type.hp * scale,
            currentSpeed: type.speed, stunTimer: 0,
        });
    }
    addNotification('⬆️ ESCALATION!', '#d946ef');
}

function getSpawnPosition() {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.max(canvas.width, canvas.height) * 0.55 + Math.random() * 80;
    return { x: game.player.x + Math.cos(angle) * dist, y: game.player.y + Math.sin(angle) * dist };
}

function updateEnemies(dt) {
    const p = game.player;
    for (const e of game.enemies) {
        if (e.stunTimer > 0) { e.stunTimer -= dt; continue; }
        const dx = p.x - e.x; const dy = p.y - e.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1) { e.x += (dx / dist) * e.currentSpeed * dt; e.y += (dy / dist) * e.currentSpeed * dt; }
    }
}

// ==================== EVENTS: CHESTS, COFFEE, SLA ====================
function updateEvents(dt) {
    const elapsed = game.time;
    // Chest spawns
    if (elapsed >= game.chestNextTime) {
        game.chestNextTime += CONFIG.CHEST_INTERVAL;
        spawnPickup('chest');
    }
    // Coffee spawns
    if (elapsed >= game.coffeeNextTime) {
        game.coffeeNextTime += CONFIG.COFFEE_INTERVAL;
        spawnPickup('coffee');
    }
}

function spawnPickup(type) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 150 + Math.random() * 250;
    game.pickups.push({
        type,
        x: game.player.x + Math.cos(angle) * dist,
        y: game.player.y + Math.sin(angle) * dist,
        life: 30, // despawn timer
    });
    if (type === 'chest') addNotification('📦 Chest appeared nearby!', '#f59e0b');
    else addNotification('☕ Coffee Break nearby!', '#92400e');
}

function updatePickups(dt) {
    const p = game.player;
    for (let i = game.pickups.length - 1; i >= 0; i--) {
        const pk = game.pickups[i];
        pk.life -= dt;
        if (pk.life <= 0) { game.pickups.splice(i, 1); continue; }
        const dx = p.x - pk.x; const dy = p.y - pk.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 30) {
            collectPickup(pk);
            game.pickups.splice(i, 1);
            sfxPickup();
        }
    }
}

function collectPickup(pk) {
    if (pk.type === 'chest') {
        // Give random weapon level or new weapon
        const p = game.player;
        const options = Object.keys(WEAPONS).filter(id => {
            const w = p.weapons.find(w => w.id === id);
            return !w || w.level < WEAPONS[id].maxLevel;
        });
        if (options.length > 0) {
            const id = options[Math.floor(Math.random() * options.length)];
            const existing = p.weapons.find(w => w.id === id);
            if (existing) { existing.level = Math.min(existing.level + 1, WEAPONS[id].maxLevel); }
            else { p.weapons.push({ id, level: 1, timer: 0, evolved: false }); }
            addNotification(`📦 Got: ${WEAPONS[id].name}!`, '#22c55e');
            updateWeaponIcons();
            checkEvolutions();
        }
    } else if (pk.type === 'coffee') {
        game.coffeeActive = 8; // 8 seconds of double fire rate
        addNotification('☕ Double fire rate for 8s!', '#f59e0b');
    }
}

// ==================== SLA TIMER ====================
function updateSLA(dt) {
    const elapsed = game.time;
    // Start new SLA challenge
    if (!game.slaTimer && elapsed >= game.slaNextTime) {
        game.slaNextTime += CONFIG.SLA_INTERVAL;
        const targetKills = 15 + Math.floor(game.time / 30) * 5;
        game.slaTimer = { kills: 0, target: targetKills, timeLeft: 15, reward: 3 };
        addNotification(`⏱️ SLA: Resolve ${targetKills} in 15s!`, '#06b6d4');
    }
    // Update active SLA
    if (game.slaTimer) {
        game.slaTimer.timeLeft -= dt;
        if (game.slaTimer.kills >= game.slaTimer.target) {
            // Success!
            const bonusXp = game.slaTimer.reward * game.player.level;
            game.player.xp += bonusXp;
            addNotification(`✅ SLA Met! +${bonusXp} XP`, '#22c55e');
            sfxMilestone();
            checkLevelUp();
            game.slaTimer = null;
        } else if (game.slaTimer.timeLeft <= 0) {
            addNotification('❌ SLA Missed...', '#ef4444');
            game.slaTimer = null;
        }
    }
}

// ==================== WEAPON SYSTEM ====================
function updateWeapons(dt) {
    const p = game.player;
    for (const w of p.weapons) {
        const def = w.evolved ? EVOLVED_WEAPONS[w.id] : WEAPONS[w.id];
        if (!def) continue;
        if (def.type === 'passive') { updatePassiveWeapon(w, def); continue; }
        if (def.type === 'orbit') { updateOrbitWeapon(w, def, dt); continue; }
        w.timer += dt * 1000;
        let interval = getWeaponInterval(w, def);
        if (game.coffeeActive > 0) interval *= 0.5;
        if (w.timer >= interval) { w.timer = 0; fireWeapon(w, def); sfxShoot(); }
    }
}

function getWeaponInterval(w, def) {
    let interval = def.baseInterval * game.player.bonusCooldown;
    if (!w.evolved) {
        if (w.id === 'approve_stamp') { if (w.level >= 4) interval *= 0.8; if (w.level >= 8) interval *= 0.5; }
        else if (w.id === 'rollback') { if (w.level >= 4) interval *= 0.8; }
        else if (w.id === 'pipeline') { if (w.level >= 4) interval *= 0.8; }
        else if (w.id === 'ticket_storm') { if (w.level >= 4) interval *= 0.8; }
    }
    return interval;
}

function getWeaponDamage(w, def) {
    let dmg = def.baseDamage * game.player.bonusDamage;
    if (!w.evolved) {
        if (w.id === 'approve_stamp') { if (w.level >= 2) dmg *= 1.25; if (w.level >= 6) dmg *= 1.35; }
        else if (w.id === 'rollback') { if (w.level >= 2) dmg *= 1.3; if (w.level >= 5) dmg *= 1.4; }
        else if (w.id === 'canary') { if (w.level >= 2) dmg *= 1.2; if (w.level >= 6) dmg *= 1.4; }
        else if (w.id === 'pipeline') { if (w.level >= 2) dmg *= 1.2; if (w.level >= 6) dmg *= 1.4; }
        else if (w.id === 'ticket_storm') { if (w.level >= 2) dmg *= 1.25; if (w.level >= 6) dmg *= 1.3; }
    }
    return dmg;
}

function getWeaponCount(w, def) {
    if (w.evolved) return def.baseCount;
    let count = def.baseCount;
    if (w.id === 'approve_stamp') { if (w.level >= 1) count = 3; if (w.level >= 3) count = 4; if (w.level >= 5) count = 5; if (w.level >= 7) count = 7; }
    else if (w.id === 'canary') { if (w.level >= 1) count = 3; if (w.level >= 3) count = 4; if (w.level >= 5) count = 5; if (w.level >= 7) count = 7; }
    else if (w.id === 'pipeline') { if (w.level >= 5) count = 2; }
    else if (w.id === 'ticket_storm') { count = 3; if (w.level >= 1) count = 4; if (w.level >= 3) count = 6; if (w.level >= 5) count = 8; if (w.level >= 7) count = 12; }
    return count;
}

function getAimedDirections(count, range) {
    const p = game.player;
    const targets = findNearestEnemies(p.x, p.y, range, count);
    const dirs = [];
    for (let i = 0; i < count; i++) {
        if (i < targets.length) {
            const t = targets[i]; const dx = t.x - p.x; const dy = t.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            dirs.push({ x: dx / dist, y: dy / dist });
        } else {
            const angle = (Math.PI * 2 * i) / count + game.time * 0.3;
            dirs.push({ x: Math.cos(angle), y: Math.sin(angle) });
        }
    }
    return dirs;
}

function findNearestEnemies(x, y, range, count) {
    return game.enemies
        .map(e => ({ e, dist: Math.sqrt((e.x - x) ** 2 + (e.y - y) ** 2) }))
        .filter(o => o.dist <= range)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, count)
        .map(o => o.e);
}

// ==================== WEAPON FIRING ====================
function fireWeapon(w, def) {
    const p = game.player;
    const dmg = getWeaponDamage(w, def);
    const count = getWeaponCount(w, def);
    const projSpeed = def.baseSpeed * p.bonusProjSpeed;

    switch (def.type) {
        case 'aimed': {
            const dirs = getAimedDirections(count, def.baseRange * 1.5);
            for (let i = 0; i < count; i++) {
                game.projectiles.push({
                    x: p.x, y: p.y, vx: dirs[i].x * projSpeed, vy: dirs[i].y * projSpeed,
                    damage: dmg, range: def.baseRange, traveled: 0, size: 10,
                    color: '#22c55e', emoji: '✅', pierce: 1, hitList: [], type: 'aimed',
                    spriteKey: 'proj_approve',
                });
            }
            break;
        }
        case 'aoe': {
            let radius = def.baseRange * p.bonusAoe;
            if (!w.evolved) { if (w.level >= 1) radius *= 1.25; if (w.level >= 3) radius *= 1.25; if (w.level >= 6) radius *= 1.25; if (w.level >= 8) radius *= 2; }
            const stun = (w.evolved || w.level >= 7) ? 0.6 : 0;
            for (const e of game.enemies) {
                const dx = e.x - p.x; const dy = e.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= radius) {
                    dealDamage(e, dmg);
                    if (stun > 0) e.stunTimer = stun;
                    const nd = dist || 1;
                    e.x += (dx / nd) * 50; e.y += (dy / nd) * 50;
                }
            }
            // Visual: use sprite if available
            game.particles.push({ x: p.x, y: p.y, type: 'ring', radius: 0, maxRadius: radius, life: 0.4, maxLife: 0.4, color: 'rgba(147,51,234,0.4)', spriteKey: 'proj_layout_change' });
            break;
        }
        case 'beam': {
            const targets = findNearestEnemies(p.x, p.y, def.baseRange * (1 + (w.evolved ? 0.5 : w.level * 0.1)), count);
            const pierce = (w.evolved || w.level >= 7) ? 3 : 1;
            for (const target of targets) {
                const dx = target.x - p.x; const dy = target.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                game.projectiles.push({
                    x: p.x, y: p.y, vx: (dx / dist) * projSpeed, vy: (dy / dist) * projSpeed,
                    damage: dmg, range: def.baseRange * 1.5, traveled: 0, size: 8,
                    color: '#60a5fa', emoji: '❓', pierce, hitList: [], type: 'beam',
                    spriteKey: 'proj_request_info',
                });
            }
            break;
        }
        case 'rain': {
            for (let i = 0; i < count; i++) {
                const target = game.enemies.length > 0 ? game.enemies[Math.floor(Math.random() * game.enemies.length)] : null;
                const tx = target ? target.x + (Math.random() - 0.5) * 30 : p.x + (Math.random() - 0.5) * 250;
                const ty = target ? target.y + (Math.random() - 0.5) * 30 : p.y + (Math.random() - 0.5) * 250;
                setTimeout(() => {
                    if (!game.running) return;
                    for (const e of game.enemies) {
                        if (Math.sqrt((e.x - tx) ** 2 + (e.y - ty) ** 2) <= 40) dealDamage(e, dmg);
                    }
                    if (w.evolved || w.level >= 8) game.fireZones.push({ x: tx, y: ty, radius: 40, damage: dmg * 0.4, life: 3, maxLife: 3 });
                    game.particles.push({ x: tx, y: ty, type: 'explosion', life: 0.4, maxLife: 0.4, size: 40, color: 'rgba(239,68,68,0.6)', spriteKey: 'proj_reject' });
                }, i * 60);
            }
            break;
        }
    }
}

function updateOrbitWeapon(w, def, dt) {
    const count = getWeaponCount(w, def);
    const dmg = getWeaponDamage(w, def);
    const orbitRadius = def.baseRange + (w.evolved ? 40 : w.level * 12);
    const speed = def.baseSpeed + (w.level >= 4 || w.evolved ? 0.5 : 0);
    const p = game.player;
    for (let i = 0; i < count; i++) {
        const angle = (game.time * speed) + (Math.PI * 2 * i) / count;
        const ox = p.x + Math.cos(angle) * orbitRadius;
        const oy = p.y + Math.sin(angle) * orbitRadius;
        for (const e of game.enemies) {
            if (Math.sqrt((e.x - ox) ** 2 + (e.y - oy) ** 2) <= e.size + 12) {
                if (!e._lastOrbitHit || game.time - e._lastOrbitHit > 0.2) {
                    dealDamage(e, dmg); e._lastOrbitHit = game.time;
                }
            }
        }
    }
}

function updatePassiveWeapon(w, def) {
    const p = game.player;
    p.damageReduction = p.passiveArmor || 0; p.regen = 0; p.thorns = 0;
    if (w.evolved) { p.damageReduction += 0.6; p.regen = 3; p.thorns = 40; return; }
    if (w.level >= 1) p.damageReduction += 0.1;
    if (w.level >= 2) p.regen += 0.5;
    if (w.level >= 3) p.damageReduction += 0.1;
    if (w.level >= 4) p.regen += 1;
    if (w.level >= 5) p.damageReduction += 0.15;
    if (w.level >= 6) p.regen += 1.5;
    if (w.level >= 7) p.thorns = 20;
    if (w.level >= 8) p.damageReduction = 0.5 + (p.passiveArmor || 0);
}

// ==================== PROJECTILES, XP, FIRE ZONES ====================
function updateProjectiles(dt) {
    for (let i = game.projectiles.length - 1; i >= 0; i--) {
        const proj = game.projectiles[i];
        proj.x += proj.vx * dt; proj.y += proj.vy * dt;
        proj.traveled += Math.sqrt((proj.vx * dt) ** 2 + (proj.vy * dt) ** 2);
        if (proj.traveled >= proj.range) { game.projectiles.splice(i, 1); continue; }
        for (const e of game.enemies) {
            if (proj.hitList.includes(e)) continue;
            if (Math.sqrt((e.x - proj.x) ** 2 + (e.y - proj.y) ** 2) <= e.size + proj.size) {
                dealDamage(e, proj.damage); proj.hitList.push(e); proj.pierce--;
                if (proj.pierce <= 0) { game.projectiles.splice(i, 1); break; }
            }
        }
    }
}

function updateXpOrbs(dt) {
    const p = game.player;
    const pickupDist = CONFIG.PICKUP_RADIUS * p.bonusPickup;
    for (let i = game.xpOrbs.length - 1; i >= 0; i--) {
        const orb = game.xpOrbs[i];
        const dx = p.x - orb.x; const dy = p.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < pickupDist) { const speed = 500; orb.x += (dx / dist) * speed * dt; orb.y += (dy / dist) * speed * dt; }
        if (dist < 22) { p.xp += orb.value * p.bonusXp; game.xpOrbs.splice(i, 1); checkLevelUp(); }
    }
}

function updateFireZones(dt) {
    for (let i = game.fireZones.length - 1; i >= 0; i--) {
        const zone = game.fireZones[i];
        zone.life -= dt;
        if (zone.life <= 0) { game.fireZones.splice(i, 1); continue; }
        for (const e of game.enemies) {
            if (Math.sqrt((e.x - zone.x) ** 2 + (e.y - zone.y) ** 2) <= zone.radius) dealDamage(e, zone.damage * dt);
        }
    }
}

// ==================== COLLISION ====================
function checkCollisions() {
    const p = game.player;
    if (p.invulnTimer > 0) return;
    for (const e of game.enemies) {
        const dx = e.x - p.x; const dy = e.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < e.size + 16) {
            const actualDmg = e.damage * (1 - Math.min(0.8, p.damageReduction));
            p.hp -= actualDmg;
            p.invulnTimer = CONFIG.INVULN_TIME;
            if (p.thorns > 0) dealDamage(e, p.thorns);
            const nd = dist || 1; e.x += (dx / nd) * 35; e.y += (dy / nd) * 35;
            triggerShake(4, 0.15);
            sfxHit();
            if (p.hp <= 0) { endGame(false); return; }
            break;
        }
    }
}

// ==================== DAMAGE & DEATH ====================
function dealDamage(enemy, amount) {
    enemy.hp -= amount;
    game.damageNumbers.push({ x: enemy.x + (Math.random() - 0.5) * 20, y: enemy.y - enemy.size, value: Math.round(amount), life: 0.5, maxLife: 0.5, vy: -70 });
    if (enemy.hp <= 0) killEnemy(enemy);
}

function killEnemy(enemy) {
    game.kills++;
    if (game.slaTimer) game.slaTimer.kills++;
    if (enemy.isBoss) { game.bossKills++; triggerShake(8, 0.3); if (enemy.id !== 'escalation') spawnEscalations(enemy.x, enemy.y); }
    const orbCount = enemy.isBoss ? 10 : 1;
    for (let i = 0; i < orbCount; i++) {
        game.xpOrbs.push({ x: enemy.x + (Math.random() - 0.5) * 30, y: enemy.y + (Math.random() - 0.5) * 30, value: enemy.xp / orbCount, size: enemy.isBoss ? 8 : 5 });
    }
    for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5;
        game.particles.push({ x: enemy.x, y: enemy.y, vx: Math.cos(angle) * 120, vy: Math.sin(angle) * 120, type: 'dot', life: 0.3, maxLife: 0.3, size: 4, color: enemy.color });
    }
    const idx = game.enemies.indexOf(enemy);
    if (idx !== -1) game.enemies.splice(idx, 1);
}

// ==================== LEVEL UP & EVOLUTION ====================
function checkLevelUp() {
    const p = game.player;
    while (p.xp >= p.xpToNext) {
        p.xp -= p.xpToNext; p.level++;
        p.xpToNext = Math.floor(CONFIG.XP_BASE * Math.pow(CONFIG.XP_GROWTH, p.level - 1));
        sfxLevelUp();
        showLevelUpChoices();
    }
}

function showLevelUpChoices() {
    game.paused = true;
    const choices = generateUpgradeChoices();
    const container = document.getElementById('upgrade-choices');
    container.innerHTML = '';
    for (const choice of choices) {
        const card = document.createElement('div');
        card.className = 'upgrade-card';
        const levelText = choice.isPassive
            ? (choice.currentLevel > 0 ? `Lv.${choice.currentLevel} → ${choice.currentLevel + 1}` : 'NEW!')
            : (choice.currentLevel > 0 ? `Lv.${choice.currentLevel} → ${choice.currentLevel + 1}` : 'NEW!');
        card.innerHTML = `
            <div class="upgrade-icon">${choice.emoji}</div>
            <div class="upgrade-info">
                <div class="upgrade-name">${choice.name}</div>
                <div class="upgrade-desc">${choice.desc}</div>
                <div class="upgrade-level">${levelText}</div>
            </div>
        `;
        card.addEventListener('click', () => { applyUpgrade(choice); document.getElementById('level-up-modal').classList.add('hidden'); game.paused = false; });
        container.appendChild(card);
    }
    document.getElementById('level-up-modal').classList.remove('hidden');
}

function generateUpgradeChoices() {
    const p = game.player;
    const allOptions = [];
    // Weapons
    for (const [id, def] of Object.entries(WEAPONS)) {
        const w = p.weapons.find(w => w.id === id);
        if (w && (w.level >= def.maxLevel || w.evolved)) continue;
        const currentLevel = w ? w.level : 0;
        allOptions.push({ id, name: def.name, emoji: def.emoji, desc: currentLevel === 0 ? def.description : def.upgrades[currentLevel], currentLevel, isPassive: false });
    }
    // Passives
    for (const [id, def] of Object.entries(PASSIVES)) {
        const level = p.passives[id] || 0;
        if (level >= def.maxLevel) continue;
        allOptions.push({ id, name: def.name, emoji: def.emoji, desc: def.description, currentLevel: level, isPassive: true });
    }
    // Shuffle and pick 4
    for (let i = allOptions.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]]; }
    return allOptions.slice(0, 4);
}

function applyUpgrade(choice) {
    const p = game.player;
    if (choice.isPassive) {
        p.passives[choice.id] = (p.passives[choice.id] || 0) + 1;
        recalcPassives();
    } else {
        const existing = p.weapons.find(w => w.id === choice.id);
        if (existing) { existing.level++; }
        else { p.weapons.push({ id: choice.id, level: 1, timer: 0, evolved: false }); }
        checkEvolutions();
    }
    updateWeaponIcons();
}

function checkEvolutions() {
    const p = game.player;
    for (const w of p.weapons) {
        if (w.evolved) continue;
        const def = WEAPONS[w.id];
        if (!def || !def.evolvesInto) continue;
        if (w.level >= def.maxLevel && p.passives[def.evolvesWith] >= 1) {
            w.id = def.evolvesInto; w.evolved = true; w.level = 1;
            game.evolvedCount++;
            addNotification(`🌟 EVOLVED: ${EVOLVED_WEAPONS[def.evolvesInto].name}!`, '#fbbf24');
            sfxMilestone();
            triggerShake(6, 0.2);
        }
    }
}

// ==================== MILESTONES & ACHIEVEMENTS ====================
function checkMilestones() {
    if (game.milestoneIndex < CONFIG.MILESTONE_KILLS.length && game.kills >= CONFIG.MILESTONE_KILLS[game.milestoneIndex]) {
        game.milestoneIndex++;
        addNotification('🎉 FULLY APPROVED!', '#22c55e', 2.5);
        sfxMilestone();
        triggerShake(5, 0.2);
        // Bonus XP
        game.player.xp += game.player.level * 5;
        checkLevelUp();
    }
}

function checkAchievements() {
    for (const ach of ACHIEVEMENTS) {
        if (game.unlockedAchievements.includes(ach.id)) continue;
        if (ach.check(game)) {
            game.unlockedAchievements.push(ach.id);
            localStorage.setItem('cs_achievements', JSON.stringify(game.unlockedAchievements));
            addNotification(`🏆 ${ach.name}: ${ach.desc}`, '#f59e0b', 3);
            sfxAchievement();
        }
    }
}

// ==================== NOTIFICATIONS ====================
function addNotification(text, color, duration = 2) {
    game.notifications.push({ text, color, life: duration, maxLife: duration });
}

function updateNotifications(dt) {
    for (let i = game.notifications.length - 1; i >= 0; i--) {
        game.notifications[i].life -= dt;
        if (game.notifications[i].life <= 0) game.notifications.splice(i, 1);
    }
}

// ==================== PARTICLES ====================
function updateParticles(dt) {
    for (let i = game.particles.length - 1; i >= 0; i--) {
        const p = game.particles[i];
        p.life -= dt;
        if (p.life <= 0) { game.particles.splice(i, 1); continue; }
        if (p.vx) p.x += p.vx * dt;
        if (p.vy) p.y += p.vy * dt;
        if (p.type === 'ring') p.radius += (p.maxRadius / p.maxLife) * dt;
    }
}

function updateDamageNumbers(dt) {
    for (let i = game.damageNumbers.length - 1; i >= 0; i--) {
        const d = game.damageNumbers[i];
        d.life -= dt; d.y += d.vy * dt;
        if (d.life <= 0) game.damageNumbers.splice(i, 1);
    }
}

// ==================== PAUSE SYSTEM ====================
function showPauseMenu() {
    if (!game.running) return;
    game.paused = true;
    document.getElementById('pause-modal').classList.remove('hidden');
    document.getElementById('pause-btn').classList.add('hidden');
}

function resumeGame() {
    game.paused = false;
    game.lastTime = performance.now();
    document.getElementById('pause-modal').classList.add('hidden');
    document.getElementById('pause-btn').classList.remove('hidden');
    requestAnimationFrame(gameLoop);
}

function quitToMenu() {
    game.running = false;
    game.paused = false;
    stopMusic();
    document.getElementById('pause-modal').classList.add('hidden');
    document.getElementById('pause-btn').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    // Reset character select
    document.getElementById('character-choices').innerHTML = '';
    buildCharacterSelect();
}

// ==================== GAME END ====================
function checkVictory() { if (game.time >= CONFIG.GAME_DURATION) endGame(true); }

function endGame(victory) {
    game.running = false; stopMusic();
    document.getElementById('pause-btn').classList.add('hidden');
    const screen = document.getElementById('game-over-screen');
    document.getElementById('end-title').textContent = victory ? '🎉 APPROVED!' : '❌ REJECTED';
    document.getElementById('end-subtitle').textContent = victory ? 'All changes processed successfully!' : 'Your change request was denied...';
    const min = Math.floor(game.time / 60); const sec = Math.floor(game.time % 60);
    document.getElementById('end-stats').innerHTML = `
        <div>⏱ Survived: ${min}:${String(sec).padStart(2, '0')}</div>
        <div>☠ Resolved: ${game.kills}</div>
        <div>⬆️ Level: ${game.player.level}</div>
        <div>🔫 Tools: ${game.player.weapons.length}</div>
        <div>🌟 Evolved: ${game.evolvedCount}</div>
        <div>🏆 Achievements: ${game.unlockedAchievements.length}/${ACHIEVEMENTS.length}</div>
    `;
    screen.classList.remove('hidden');
}

// ==================== RENDERING ====================
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const shake = getShakeOffset();
    ctx.save();
    ctx.translate(-game.camera.x + shake.x, -game.camera.y + shake.y);

    drawWorld();
    drawFireZones();
    drawTrails();
    drawXpOrbs();
    drawPickups();
    drawEnemies();
    drawProjectiles();
    drawOrbitWeapons();
    drawPlayer();
    drawParticles();
    drawDamageNumbers();

    ctx.restore();

    // UI overlays (screen-space)
    drawMinimap();
    drawNotifications();
    drawSLABar();
    if (game.coffeeActive > 0) drawCoffeeIndicator();
}

function drawWorld() {
    const tileSize = 80;
    const startX = Math.floor(game.camera.x / tileSize) * tileSize;
    const startY = Math.floor(game.camera.y / tileSize) * tileSize;
    const endX = game.camera.x + canvas.width + tileSize;
    const endY = game.camera.y + canvas.height + tileSize;

    for (let x = startX; x < endX; x += tileSize) {
        for (let y = startY; y < endY; y += tileSize) {
            const isAlt = (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0;
            ctx.fillStyle = isAlt ? '#1a1f2e' : '#1e2436';
            ctx.fillRect(x, y, tileSize, tileSize);
        }
    }
    ctx.strokeStyle = 'rgba(100,120,160,0.06)';
    ctx.lineWidth = 1;
    for (let x = startX; x < endX; x += tileSize) { ctx.beginPath(); ctx.moveTo(x, game.camera.y); ctx.lineTo(x, game.camera.y + canvas.height); ctx.stroke(); }
    for (let y = startY; y < endY; y += tileSize) { ctx.beginPath(); ctx.moveTo(game.camera.x, y); ctx.lineTo(game.camera.x + canvas.width, y); ctx.stroke(); }

    // Office furniture
    const fs = 320;
    const fsx = Math.floor(game.camera.x / fs) * fs;
    const fsy = Math.floor(game.camera.y / fs) * fs;
    for (let fx = fsx; fx < endX; fx += fs) {
        for (let fy = fsy; fy < endY; fy += fs) {
            const seed = Math.abs((Math.sin(fx * 12.9898 + fy * 78.233) * 43758.5453) % 1);
            if (seed < 0.25) drawDesk(fx + 40, fy + 40);
            else if (seed < 0.4) drawCabinet(fx + 60, fy + 20);
            else if (seed < 0.55) drawPlant(fx + 30, fy + 50);
            else if (seed < 0.65) drawPrinter(fx + 50, fy + 60);
        }
    }
    ctx.strokeStyle = 'rgba(239,68,68,0.3)'; ctx.lineWidth = 4; ctx.setLineDash([20,10]);
    ctx.strokeRect(0, 0, CONFIG.WORLD_SIZE, CONFIG.WORLD_SIZE); ctx.setLineDash([]);
}

function drawDesk(x, y) {
    ctx.fillStyle = 'rgba(139,92,56,0.25)'; ctx.fillRect(x, y, 60, 35);
    ctx.strokeStyle = 'rgba(139,92,56,0.4)'; ctx.lineWidth = 1; ctx.strokeRect(x, y, 60, 35);
    ctx.fillStyle = 'rgba(30,41,59,0.5)'; ctx.fillRect(x + 20, y + 5, 20, 15);
    ctx.fillStyle = 'rgba(96,165,250,0.12)'; ctx.fillRect(x + 22, y + 7, 16, 11);
}
function drawCabinet(x, y) {
    ctx.fillStyle = 'rgba(71,85,105,0.3)'; ctx.fillRect(x, y, 25, 45);
    ctx.strokeStyle = 'rgba(71,85,105,0.4)'; ctx.lineWidth = 1; ctx.strokeRect(x, y, 25, 45);
}
function drawPlant(x, y) {
    ctx.fillStyle = 'rgba(180,83,9,0.25)'; ctx.fillRect(x - 6, y + 5, 12, 10);
    ctx.fillStyle = 'rgba(34,197,94,0.2)'; ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
}
function drawPrinter(x, y) {
    ctx.fillStyle = 'rgba(51,65,85,0.35)'; ctx.fillRect(x, y, 35, 20);
    ctx.strokeStyle = 'rgba(71,85,105,0.4)'; ctx.lineWidth = 1; ctx.strokeRect(x, y, 35, 20);
}

function drawTrails() {
    for (const t of game.trails) {
        const alpha = t.life / t.maxLife;
        ctx.beginPath(); ctx.arc(t.x, t.y, t.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${alpha * 0.3})`; ctx.fill();
    }
}

function drawFireZones() {
    for (const zone of game.fireZones) {
        const alpha = (zone.life / zone.maxLife) * 0.4;
        ctx.beginPath(); ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239,68,68,${alpha})`; ctx.fill();
    }
}

function drawXpOrbs() {
    for (const orb of game.xpOrbs) {
        ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = '#60a5fa'; ctx.shadowColor = '#3b82f6'; ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0;
    }
}

function drawPickups() {
    for (const pk of game.pickups) {
        const bob = Math.sin(game.time * 3) * 3;
        ctx.font = '24px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(pk.type === 'chest' ? '📦' : '☕', pk.x, pk.y + bob);
        // Glow
        ctx.beginPath(); ctx.arc(pk.x, pk.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = pk.type === 'chest' ? 'rgba(245,158,11,0.15)' : 'rgba(146,64,14,0.15)'; ctx.fill();
    }
}

function drawEnemies() {
    for (const e of game.enemies) {
        // Shadow
        ctx.beginPath(); ctx.ellipse(e.x, e.y + e.size * 0.7, e.size * 0.5, e.size * 0.15, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fill();

        // Draw sprite if available, else fallback to colored circle + emoji
        const sprite = SPRITES[e.id];
        if (sprite) {
            const drawSize = e.size * 2.8;
            ctx.drawImage(sprite, e.x - drawSize / 2, e.y - drawSize / 2, drawSize, drawSize);
            if (e.isBoss) {
                ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(e.x, e.y, drawSize / 2 + 2, 0, Math.PI * 2); ctx.stroke();
            }
        } else {
            ctx.beginPath(); ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2); ctx.fillStyle = e.color; ctx.fill();
            if (e.isBoss) { ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3; ctx.stroke(); }
            ctx.font = `${e.size}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(e.emoji, e.x, e.y);
        }

        // HP bar
        if (e.hp < e.maxHp) {
            const bw = e.size * 2; const pct = e.hp / e.maxHp;
            ctx.fillStyle = '#1e293b'; ctx.fillRect(e.x - bw / 2, e.y - e.size - 8, bw, 4);
            ctx.fillStyle = pct > 0.5 ? '#22c55e' : pct > 0.25 ? '#f59e0b' : '#ef4444';
            ctx.fillRect(e.x - bw / 2, e.y - e.size - 8, bw * pct, 4);
        }

        // Stun indicator
        if (e.stunTimer > 0) { ctx.font = '10px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💫', e.x, e.y - e.size - 12); }
    }
}

function drawProjectiles() {
    for (const proj of game.projectiles) {
        // Determine which sprite to use based on projectile type/weapon
        let sprite = null;
        if (proj.spriteKey) sprite = SPRITES[proj.spriteKey];

        if (sprite) {
            const drawSize = proj.size * 3;
            ctx.drawImage(sprite, proj.x - drawSize / 2, proj.y - drawSize / 2, drawSize, drawSize);
        } else {
            ctx.beginPath(); ctx.arc(proj.x, proj.y, proj.size, 0, Math.PI * 2); ctx.fillStyle = proj.color; ctx.fill();
            ctx.font = `${proj.size + 4}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(proj.emoji, proj.x, proj.y);
        }
    }
}

function drawOrbitWeapons() {
    const p = game.player;
    for (const w of p.weapons) {
        const def = w.evolved ? EVOLVED_WEAPONS[w.id] : WEAPONS[w.id];
        if (!def || def.type !== 'orbit') continue;
        const count = getWeaponCount(w, def);
        const orbitRadius = def.baseRange + (w.evolved ? 40 : w.level * 12);
        const speed = def.baseSpeed + (w.level >= 4 || w.evolved ? 0.5 : 0);
        const sprite = SPRITES.proj_correspondence;
        for (let i = 0; i < count; i++) {
            const angle = (game.time * speed) + (Math.PI * 2 * i) / count;
            const ox = p.x + Math.cos(angle) * orbitRadius; const oy = p.y + Math.sin(angle) * orbitRadius;
            if (sprite) {
                const sz = 28;
                ctx.drawImage(sprite, ox - sz / 2, oy - sz / 2, sz, sz);
            } else {
                ctx.font = '14px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText(w.evolved ? '📧' : '📨', ox, oy);
            }
        }
    }
}

function drawPlayer() {
    const p = game.player;
    if (p.invulnTimer > 0 && Math.floor(p.invulnTimer / 80) % 2 === 0) return;
    // Shadow
    ctx.beginPath(); ctx.ellipse(p.x, p.y + 14, 12, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fill();

    // Draw sprite if loaded, else fallback to emoji
    const sprite = SPRITES[p.charId];
    if (sprite) {
        const size = 64;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
    } else {
        ctx.beginPath(); ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = '#1e40af'; ctx.fill(); ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2; ctx.stroke();
        ctx.font = '18px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.charEmoji, p.x, p.y);
    }

    // Shield indicator
    if (p.damageReduction > 0.05) { ctx.beginPath(); ctx.arc(p.x, p.y, 22, 0, Math.PI * 2); ctx.strokeStyle = `rgba(99,102,241,${0.3 + p.damageReduction * 0.5})`; ctx.lineWidth = 2; ctx.stroke(); }
}

function drawParticles() {
    for (const p of game.particles) {
        const alpha = p.life / p.maxLife;
        if (p.type === 'ring') {
            // Use sprite for AOE ring if available
            const sprite = p.spriteKey ? SPRITES[p.spriteKey] : null;
            if (sprite) {
                const sz = p.radius * 2;
                ctx.globalAlpha = alpha;
                ctx.drawImage(sprite, p.x - sz / 2, p.y - sz / 2, sz, sz);
                ctx.globalAlpha = 1;
            } else {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.strokeStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`); ctx.lineWidth = 4; ctx.stroke();
            }
        } else if (p.type === 'explosion') {
            // Use sprite for explosion if available
            const sprite = p.spriteKey ? SPRITES[p.spriteKey] : null;
            if (sprite) {
                const sz = p.size * (2 - alpha);
                ctx.globalAlpha = alpha;
                ctx.drawImage(sprite, p.x - sz / 2, p.y - sz / 2, sz, sz);
                ctx.globalAlpha = 1;
            } else {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (1 - alpha * 0.5), 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`); ctx.fill();
            }
        } else {
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
            ctx.fillStyle = p.color; ctx.globalAlpha = alpha; ctx.fill(); ctx.globalAlpha = 1;
        }
    }
}

function drawDamageNumbers() {
    for (const d of game.damageNumbers) {
        const alpha = d.life / d.maxLife;
        ctx.font = `bold ${11 + d.value * 0.05}px Arial`; ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fillText(d.value, d.x, d.y);
    }
}

// ==================== MINIMAP ====================
function drawMinimap() {
    const mmSize = 120; const mmX = canvas.width - mmSize - 10; const mmY = canvas.height - mmSize - 10;
    const scale = mmSize / CONFIG.WORLD_SIZE;

    ctx.fillStyle = 'rgba(15,23,42,0.8)'; ctx.fillRect(mmX, mmY, mmSize, mmSize);
    ctx.strokeStyle = 'rgba(71,85,105,0.6)'; ctx.lineWidth = 1; ctx.strokeRect(mmX, mmY, mmSize, mmSize);

    // Player
    const px = mmX + game.player.x * scale; const py = mmY + game.player.y * scale;
    ctx.fillStyle = '#60a5fa'; ctx.fillRect(px - 2, py - 2, 4, 4);

    // Enemies (dots)
    ctx.fillStyle = 'rgba(239,68,68,0.6)';
    for (const e of game.enemies) {
        if (e.isBoss) { ctx.fillStyle = '#fbbf24'; ctx.fillRect(mmX + e.x * scale - 2, mmY + e.y * scale - 2, 4, 4); ctx.fillStyle = 'rgba(239,68,68,0.6)'; }
        else { ctx.fillRect(mmX + e.x * scale - 1, mmY + e.y * scale - 1, 2, 2); }
    }

    // Pickups
    ctx.fillStyle = '#f59e0b';
    for (const pk of game.pickups) { ctx.fillRect(mmX + pk.x * scale - 2, mmY + pk.y * scale - 2, 4, 4); }
}

// ==================== NOTIFICATIONS ====================
function drawNotifications() {
    let y = 100;
    for (const n of game.notifications) {
        const alpha = Math.min(1, n.life / 0.5);
        ctx.font = 'bold 16px Arial'; ctx.textAlign = 'center';
        ctx.globalAlpha = alpha;
        ctx.fillStyle = n.color;
        ctx.fillText(n.text, canvas.width / 2, y);
        ctx.globalAlpha = 1;
        y += 24;
    }
}

// ==================== SLA BAR ====================
function drawSLABar() {
    if (!game.slaTimer) return;
    const sla = game.slaTimer;
    const barW = 250; const barH = 20;
    const x = (canvas.width - barW) / 2; const y = 55;
    const pct = sla.kills / sla.target;
    const timePct = sla.timeLeft / 15;

    ctx.fillStyle = 'rgba(15,23,42,0.9)'; ctx.fillRect(x - 5, y - 5, barW + 10, barH + 22);
    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 1; ctx.strokeRect(x - 5, y - 5, barW + 10, barH + 22);
    ctx.font = '10px Arial'; ctx.textAlign = 'center'; ctx.fillStyle = '#06b6d4';
    ctx.fillText(`SLA: ${sla.kills}/${sla.target} | ${sla.timeLeft.toFixed(1)}s`, canvas.width / 2, y + barH + 12);
    ctx.fillStyle = '#1e293b'; ctx.fillRect(x, y, barW, barH);
    ctx.fillStyle = timePct > 0.3 ? '#06b6d4' : '#ef4444'; ctx.fillRect(x, y, barW * pct, barH);
}

// ==================== COFFEE INDICATOR ====================
function drawCoffeeIndicator() {
    ctx.font = '14px Arial'; ctx.textAlign = 'left'; ctx.fillStyle = '#f59e0b';
    ctx.fillText(`☕ ${game.coffeeActive.toFixed(1)}s`, 10, canvas.height - 20);
}

// ==================== HUD ====================
function updateHUD() {
    const p = game.player; if (!p) return;
    document.getElementById('hp-bar').style.width = Math.max(0, p.hp / p.maxHp) * 100 + '%';
    document.getElementById('hp-text').textContent = `${Math.ceil(p.hp)}/${Math.round(p.maxHp)}`;
    document.getElementById('xp-bar').style.width = (p.xp / p.xpToNext) * 100 + '%';
    document.getElementById('xp-text').textContent = `Lv.${p.level}`;
    const rem = Math.max(0, CONFIG.GAME_DURATION - game.time);
    document.getElementById('timer').textContent = `${String(Math.floor(rem / 60)).padStart(2, '0')}:${String(Math.floor(rem % 60)).padStart(2, '0')}`;
    document.getElementById('kill-count').textContent = `☠ ${game.kills}`;
}

function updateWeaponIcons() {
    const container = document.getElementById('weapon-icons');
    container.innerHTML = '';
    for (const w of game.player.weapons) {
        const def = w.evolved ? EVOLVED_WEAPONS[w.id] : WEAPONS[w.id];
        if (!def) continue;
        const icon = document.createElement('div');
        icon.className = 'weapon-icon' + (w.evolved ? ' evolved' : '');
        icon.innerHTML = `${def.emoji}<span class="weapon-level">${w.evolved ? '★' : w.level}</span>`;
        container.appendChild(icon);
    }
}

// ==================== SPRITE LOADING ====================
const SPRITES = {};
const SPRITE_SOURCES = {
    change_manager: 'assets/main_change_am.png',
    change_support: 'assets/main_support.png',
    ops: 'assets/main_ops.png',
    // Enemies
    cr_request: 'assets/change_request.png',
    approval_pending: 'assets/pending_approval.png',
    pipeline_fail: 'assets/on_hold.png',
    merge_conflict: 'assets/layout.png',
    sev2_alarm: 'assets/reminder.png',
    tech_debt: 'assets/gbs.png',
    change_freeze: 'assets/asana_intake.png',
    prod_outage: 'assets/approval_plan.png',
    escalation: 'assets/escalation.png',
    // Weapons / Projectiles
    proj_approve: 'assets/approve.png',
    proj_layout_change: 'assets/layout_change.png',
    proj_correspondence: 'assets/add_correspondence.png',
    proj_request_info: 'assets/request_for_info.png',
    proj_reject: 'assets/reject.png',
};

function loadSprites(callback) {
    const keys = Object.keys(SPRITE_SOURCES);
    let loaded = 0;
    if (keys.length === 0) { callback(); return; }
    for (const key of keys) {
        const img = new Image();
        img.onload = () => {
            SPRITES[key] = img;
            loaded++;
            if (loaded >= keys.length) callback();
        };
        img.onerror = () => {
            loaded++;
            if (loaded >= keys.length) callback();
        };
        img.src = SPRITE_SOURCES[key];
    }
}

// ==================== START ====================
window.addEventListener('load', () => {
    loadSprites(() => { init(); });
});
