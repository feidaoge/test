import React, { useState, createContext, useContext, useEffect } from 'react';

const translations = {
  en: {
    pageTitle: 'Crypto Market Sentiment Daily',
    pageSubtitle: 'In-depth sentiment analysis with comprehensive driver breakdown and historical context.',
    marketPulse: 'Market Sentiment & Five Drivers',
    marketPulseDesc: 'Quantified sentiment score with detailed factor analysis.',
    contributingFactors: 'Five Key Drivers - Detailed Analysis',
    extremeFear: 'Extreme Fear', fear: 'Fear', neutral: 'Neutral', optimistic: 'Optimistic', extremeGreed: 'Extreme Greed',
    tapeStructure: 'Tape & Structure', leverageLiquidations: 'Leverage & Liquidations', institutionalFlows: 'Institutional / On-chain',
    macroRisks: 'Macro & Risk Events', socialNarrative: 'Social & Narrative',
    mssScore: 'MSS', extremeFearZone: 'Extreme Fear Zone (0-20)', meaningLabel: 'Reading', weight: 'Weight', score: 'Score', direction: 'Direction',
    evidence: 'Evidence from Today\'s News', conclusion: 'Conclusion', analysis: 'In-Depth Analysis',
    historicalReplay: 'Historical Event Retrospective', historicalReplayDesc: 'Similar historical events with detailed context and aftermath.',
    backgroundContext: 'Background & Context', marketConditions: 'Market Conditions', whatHappened: 'What Actually Happened After',
    newsTimeline: 'Today\'s News Briefings', newsTimelineDesc: 'Comprehensive briefings with context and market relevance.',
    dataSource: 'Data Source', reportDate: 'Report Date', items: 'items', marketRelevance: 'Market Relevance',
  },
  zh: {
    pageTitle: '加密市场情绪日报',
    pageSubtitle: '深度情绪分析与市场驱动因子拆解，结合历史背景研判。',
    marketPulse: '当下市场情绪与五重驱动因子',
    marketPulseDesc: '量化情绪得分与详细因子分析。',
    contributingFactors: '五重驱动因子 - 详细分析',
    extremeFear: '极度恐惧', fear: '恐惧', neutral: '中性', optimistic: '乐观', extremeGreed: '极度贪婪',
    tapeStructure: '价格与结构', leverageLiquidations: '杠杆与清算', institutionalFlows: '机构 / 链上资金',
    macroRisks: '宏观与风险事件', socialNarrative: '社交与叙事分布',
    mssScore: 'MSS', extremeFearZone: '极度恐惧区间 (0-20)', meaningLabel: '读数说明', weight: '权重', score: '得分', direction: '当前方向',
    evidence: '来自当日资讯的直接事实', conclusion: '结论', analysis: '深度分析',
    historicalReplay: '历史事件回溯', historicalReplayDesc: '历史相似事件详细背景与后续发展分析。',
    backgroundContext: '事件背景与脉络', marketConditions: '当时市场状况', whatHappened: '后续实际发生',
    newsTimeline: '当日资讯简报', newsTimelineDesc: '综合资讯简报，附带背景说明与市场关联分析。',
    dataSource: '数据来源', reportDate: '报告日期', items: '条', marketRelevance: '市场关联',
  }
};

const LanguageContext = createContext();
const useLanguage = () => useContext(LanguageContext);
const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('zh');
  const t = (key) => translations[lang][key] || key;
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

const useResponsive = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return { isMobile: width < 640 };
};

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{ display: 'flex', gap: '4px', background: '#F5F5F4', borderRadius: '8px', padding: '3px' }}>
      {['en', 'zh'].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding: '8px 16px', fontSize: '13px', fontWeight: lang === l ? '600' : '400', border: 'none', borderRadius: '6px',
          cursor: 'pointer', background: lang === l ? '#FFF' : 'transparent', color: lang === l ? '#1C1917' : '#78716C',
        }}>{l === 'en' ? 'EN' : '中文'}</button>
      ))}
    </div>
  );
};

const reportData = {
  date: '2026-02-07',
  dataSource: { en: 'Multi-source News (Bloomberg, CoinDesk, Coinglass, Glassnode, Alternative.me)', zh: '多源聚合资讯（彭博、CoinDesk、Coinglass、Glassnode、Alternative.me）' },
  mssScore: 6,
  drivers: [
    {
      key: 'tapeStructure', score: 5, weight: 25, icon: '📉',
      direction: { en: 'V-Shape Recovery - Historic Low Tested', zh: 'V型反弹 - 历史低点已测试' },
      evidence: {
        en: [
          'BTC crashed to $60,008 on Feb 5 - lowest since November 2024, a single-day drop of 13% (steepest since FTX collapse).',
          'V-shaped recovery on Feb 6: +11% single-day gain to $71,000+, largest daily gain since early 2023.',
          'Currently trading at $68,567, up 4.91% in 24h. ATH drawdown remains -46% from $126,272 (Oct 2025).',
          'Total market cap lost ~$800B from peak. 7-day change: -20.9%.'
        ],
        zh: [
          'BTC 于 2 月 5 日暴跌至 $60,008 - 自 2024 年 11 月以来最低，单日跌幅 13%（FTX 崩盘以来最陡）。',
          '2 月 6 日 V 型反弹：单日涨幅 +11% 至 $71,000+，为 2023 年初以来最大单日涨幅。',
          '目前交易于 $68,567，24 小时涨 4.91%。距历史高点 $126,272（2025 年 10 月）回撤 -46%。',
          '总市值从峰值蒸发约 8000 亿美元。7 日跌幅：-20.9%。'
        ]
      },
      analysis: { 
        en: 'The Feb 5-6 crash-recovery sequence is remarkable: a 13% crash followed by an 11% rebound within 24 hours. In 2022, similar crashes took months to recover. Weekly RSI dropped below 21 - the third-lowest oversold reading in BTC history. Critical support zone at $60K-$65K held during the crash.', 
        zh: '2 月 5-6 日的崩盘-复苏序列非同寻常：13% 的崩盘后 24 小时内反弹 11%。2022 年类似崩盘需要数月恢复。周线 RSI 跌破 21——BTC 历史上第三低的超卖读数。$60K-$65K 关键支撑区在崩盘期间守住。' 
      },
      conclusion: { 
        en: 'V-shape recovery speed signals market maturation. However, -46% ATH drawdown and extreme volatility suggest bottom formation process, not confirmed bottom.', 
        zh: 'V 型反弹速度显示市场成熟。然而，-46% 的历史高点回撤和极端波动表明底部形成过程中，并非确认底部。' 
      }
    },
    {
      key: 'leverageLiquidations', score: 4, weight: 20, icon: '⚡',
      direction: { en: 'Historic Deleveraging - 10th Largest Ever', zh: '历史级去杠杆 - 史上第 10 大' },
      evidence: {
        en: [
          '$2.6 billion liquidated in 24 hours on Feb 5-6 - the 10th largest single-day liquidation event EVER per Coinglass.',
          '84%+ were long positions ($2.2B longs vs shorts). BTC liquidations: $860M, ETH: $420M.',
          'Open interest fell below $100B for first time since March 2025.',
          'Feb 6 rebound triggered $120M+ short liquidations in just 1 hour - shorts caught off guard.'
        ],
        zh: [
          '2 月 5-6 日 24 小时清算 26 亿美元——据 Coinglass 为史上第 10 大单日清算事件。',
          '84%+ 为多头头寸（22 亿多头 vs 空头）。BTC 清算：8.6 亿，ETH：4.2 亿。',
          '未平仓合约自 2025 年 3 月以来首次跌破 1000 亿美元。',
          '2 月 6 日反弹在 1 小时内触发超 1.2 亿美元空头清算——空头措手不及。'
        ]
      },
      analysis: { 
        en: 'This $2.6B liquidation ranks in the top 10 ever, approaching FTX-era levels. The 84%+ long liquidation ratio indicates extreme overleveraged bullish positioning was flushed. Implied volatility peaked near 100% on Feb 5, now settling around 70%. Put premium over calls reached 20+ points - extreme fear in options market.', 
        zh: '这 26 亿美元清算位列史上前 10，接近 FTX 时代水平。84%+ 多头清算比例表明极度杠杆看多头寸被清洗。隐含波动率 2 月 5 日峰值接近 100%，现稳定在 70% 左右。看跌期权溢价超过看涨 20+ 点——期权市场极度恐惧。' 
      },
      conclusion: { 
        en: 'Historic liquidation events of this magnitude have historically preceded major bottoms. The deleveraging is healthy long-term but short-term volatility risk remains extremely high.', 
        zh: '如此规模的历史级清算事件历史上往往先于重大底部。去杠杆对长期健康但短期波动风险仍然极高。' 
      }
    },
    {
      key: 'institutionalFlows', score: 12, weight: 25, icon: '🐋',
      direction: { en: 'Critical Divergence - ETF Panic vs Corporate Diamond Hands', zh: '关键分歧 - ETF 恐慌 vs 企业钻石手' },
      evidence: {
        en: [
          'US BTC ETFs cumulative outflows since Nov 2025: $6.18B - longest sustained outflow streak since launch.',
          'IBIT record trading volume on Feb 5: $10.7B (mostly selling). Single-day outflow: $528M.',
          'ETF average cost basis: $87,830 - 62% of holdings now underwater at current prices.',
          'COUNTER-SIGNAL: 190+ companies hold 956K BTC collectively. Strategy (MSTR) holds 713,502 BTC at $76,052 avg - NOT selling.'
        ],
        zh: [
          '美国 BTC ETF 自 2025 年 11 月累计流出：61.8 亿美元——上市以来最长持续流出期。',
          'IBIT 2 月 5 日创纪录交易量：107 亿美元（主要为卖出）。单日流出：5.28 亿。',
          'ETF 平均成本基础：$87,830——按当前价格 62% 持仓处于亏损。',
          '反向信号：190+ 家公司共持有 95.6 万 BTC。Strategy（MSTR）持有 713,502 BTC，均价 $76,052——未抛售。'
        ]
      },
      analysis: { 
        en: 'Critical divergence emerges: regulated channels (ETFs) show panic selling while corporate treasuries maintain conviction. MSTR reported $12.4B unrealized Q4 loss but faces no margin call risk until ~$8K. Tether minted ~$2B USDT in 48 hours during the crash - liquidity injection. This divergence pattern mirrors Jan 2023 post-FTX bottom formation.', 
        zh: '出现关键分歧：受监管渠道（ETF）显示恐慌抛售，而企业金库保持信念。MSTR 报告 Q4 未实现亏损 124 亿美元，但直到约 $8K 才面临追加保证金风险。Tether 在崩盘期间 48 小时内铸造约 20 亿 USDT——流动性注入。这种分歧模式与 2023 年 1 月 FTX 后底部形成相似。' 
      },
      conclusion: { 
        en: 'Classic divergence: retail/ETF panic vs institutional/corporate accumulation. Historically the strongest long-term bullish signal when seen at extremes.', 
        zh: '经典分歧：散户/ETF 恐慌 vs 机构/企业积累。历史上在极端情况下出现是最强的长期看涨信号。' 
      }
    },
    {
      key: 'macroRisks', score: 8, weight: 15, icon: '🌍',
      direction: { en: 'Multi-Front Macro Storm - Cross-Asset Selloff', zh: '多重宏观风暴 - 跨资产抛售' },
      evidence: {
        en: [
          'Silver crashed 30% single-day - worst since March 1980. Gold down 12%. Broad commodity selloff.',
          'Kevin Warsh nominated as Fed Chair successor - markets interpret as hawkish, triggering risk-off.',
          'US-Iran geopolitical tensions elevated, adding uncertainty.',
          'Michael Burry ("Big Short") warns BTC has "no organic use case" and could trigger corporate "death spiral".'
        ],
        zh: [
          '白银单日暴跌 30%——自 1980 年 3 月以来最差。黄金跌 12%。大宗商品全面抛售。',
          'Kevin Warsh 被提名为美联储主席继任者——市场解读为鹰派，触发避险。',
          '美伊地缘政治紧张升级，增加不确定性。',
          'Michael Burry（"大空头"）警告 BTC "没有有机用例"，可能触发企业"死亡螺旋"。'
        ]
      },
      analysis: { 
        en: 'The silver crash is historic context - worst single day since 1980. BTC is trading as a high-beta risk asset with 0.7+ correlation to Nasdaq. The "digital gold" narrative has broken as BTC fell alongside gold rather than acting as hedge. Warsh appointment signals no near-term Fed pivot.', 
        zh: '白银崩盘具有历史背景——自 1980 年以来最差单日。BTC 作为高贝塔风险资产交易，与纳斯达克相关性超 0.7。"数字黄金"叙事已破裂，BTC 与黄金同跌而非作为对冲。Warsh 任命表明近期美联储不会转向。' 
      },
      conclusion: { 
        en: 'Multi-front macro pressure with no clear catalyst for relief. However, extreme positioning often creates snapback rallies regardless of macro.', 
        zh: '多重宏观压力，无明确缓解催化剂。然而，极端持仓往往无论宏观如何都会产生急剧反弹。' 
      }
    },
    {
      key: 'socialNarrative', score: 6, weight: 15, icon: '💬',
      direction: { en: 'Historic Fear - Lowest Since Terra/Luna Collapse', zh: '历史级恐惧 - Terra/Luna 崩盘以来最低' },
      evidence: {
        en: [
          'Fear & Greed Index crashed to 6 - lowest since June 2022 (Terra collapse, which hit 7).',
          'Only comparable readings: Terra (7), FTX (10), 519 Crash (11), COVID Crash (12).',
          'Polymarket: 56% odds BTC hits $70K or below in February.',
          'Market participants report "fear and fatigue" - classic capitulation language.'
        ],
        zh: [
          '恐惧与贪婪指数暴跌至 6——自 2022 年 6 月（Terra 崩盘时为 7）以来最低。',
          '唯一可比读数：Terra（7）、FTX（10）、519 崩盘（11）、COVID 崩盘（12）。',
          'Polymarket：56% 概率 BTC 在 2 月触及 $70K 或以下。',
          '市场参与者报告"恐惧与疲惫"——经典投降语言。'
        ]
      },
      analysis: { 
        en: 'Fear & Greed at 6 is extraordinary - only seen during generational capitulation events. Historical pattern: readings below 15 have ALWAYS preceded major cycle bottoms with subsequent 6-18 month returns of +130% to +1,600%. The "fear and fatigue" narrative suggests capitulation in progress.', 
        zh: '恐惧与贪婪 6 是非凡的——只在世代级投降事件中出现。历史模式：低于 15 的读数总是先于主要周期底部，随后 6-18 个月回报 +130% 至 +1,600%。"恐惧与疲惫"叙事表明投降正在进行。' 
      },
      conclusion: { 
        en: 'Extreme fear readings at 6 have historically marked generational buying opportunities. Timing uncertain but risk/reward increasingly favorable for long-term positioning.', 
        zh: '极度恐惧读数 6 历史上标志着世代级买入机会。时机不确定但长期持仓的风险/回报越来越有利。' 
      }
    }
  ],
  historicalEvents: [
    {
      driverKey: 'tapeStructure', driverScore: 5,
      event: {
        title: { en: 'Terra/Luna Collapse - June 2022', zh: 'Terra/Luna 崩盘 - 2022年6月' },
        time: '2022-06',
        background: { en: 'Algorithmic stablecoin death spiral triggered broader market contagion. Fear & Greed hit 7 - closest comparison to today\'s 6.', zh: '算法稳定币死亡螺旋触发更广泛市场传染。恐惧与贪婪跌至 7——与今天 6 最接近的对比。' },
        description: { en: ['BTC fell from $40K to $17,600 over several weeks', 'Fear & Greed bottomed at 7 - only 1 point higher than today', '$40B+ in value destroyed across ecosystem', 'Contagion spread to 3AC, Celsius, Voyager'], zh: ['BTC 在数周内从 $40K 跌至 $17,600', '恐惧与贪婪底部 7——仅比今天高 1 点', '生态系统中超过 400 亿美元价值被摧毁', '传染蔓延至 3AC、Celsius、Voyager'] },
        aftermath: { en: ['Absolute bottom at $17,600 in June 2022', 'Rallied 360%+ to $74K by March 2024 (18 months)', 'KEY: Fear & Greed at 7 marked THE generational bottom'], zh: ['2022 年 6 月绝对底部 $17,600', '到 2024 年 3 月涨至 $74K，涨幅超 360%（18 个月）', '关键：恐惧与贪婪 7 标志着世代级底部'] }
      }
    },
    {
      driverKey: 'leverageLiquidations', driverScore: 4,
      event: {
        title: { en: 'FTX Collapse Cascade - November 2022', zh: 'FTX 崩盘级联 - 2022年11月' },
        time: '2022-11',
        background: { en: 'FTX collapse triggered massive liquidation cascade. Fear & Greed hit 10. Today\'s $2.6B liquidation approaches those historic levels.', zh: 'FTX 崩盘触发大规模清算级联。恐惧与贪婪跌至 10。今天 26 亿美元清算接近那些历史水平。' },
        description: { en: ['$10B+ liquidations over the week', 'BTC dropped to $15,500 - cycle low', 'Fear & Greed hit 8-10 range', 'Industry-wide contagion and bankruptcies'], zh: ['一周清算超 100 亿美元', 'BTC 跌至 $15,500 - 周期低点', '恐惧与贪婪在 8-10 区间', '全行业传染和破产'] },
        aftermath: { en: ['Bottom at $15,479 in November 2022', 'Rallied 350%+ to $74K by March 2024 (16 months)', 'KEY: Historic liquidations marked THE cycle bottom'], zh: ['2022 年 11 月底部 $15,479', '到 2024 年 3 月涨至 $74K，涨幅超 350%（16 个月）', '关键：历史级清算标志着周期底部'] }
      }
    },
    {
      driverKey: 'socialNarrative', driverScore: 6,
      event: {
        title: { en: '519 Black Swan Crash - May 2021', zh: '519 黑天鹅崩盘 - 2021年5月' },
        time: '2021-05',
        background: { en: 'China mining ban + Tesla BTC payment halt. Fear & Greed hit 11. Similar waterfall pattern and capitulation sentiment to today.', zh: '中国矿业禁令 + 特斯拉暂停 BTC 支付。恐惧与贪婪跌至 11。与今天类似的瀑布式形态和投降情绪。' },
        description: { en: ['BTC fell from $58K to below $30K in 48 hours - 48% drop', '$8B+ liquidated in 24 hours', 'Fear & Greed hit 11', 'Mass panic across all crypto social media'], zh: ['BTC 48 小时内从 $58K 跌至 $30K 以下——跌幅 48%', '24 小时清算超 80 亿美元', '恐惧与贪婪跌至 11', '所有加密社交媒体大规模恐慌'] },
        aftermath: { en: ['Bottom found ~$29K in late June', 'New ATH $69K by November - just 5 months later', 'KEY: Those who panic sold at $30K missed 130%+ gains'], zh: ['6 月底在约 $29K 找到底部', '11 月达到 $69K 新高——仅 5 个月后', '关键：在 $30K 恐慌抛售的人错过了 130%+ 涨幅'] }
      }
    },
    {
      driverKey: 'institutionalFlows', driverScore: 12,
      event: {
        title: { en: 'COVID Crash & Recovery - March 2020', zh: 'COVID 崩盘与复苏 - 2020年3月' },
        time: '2020-03',
        background: { en: 'Global pandemic panic. Fear & Greed hit 12. BTC fell 50%+ in days but recovered fastest among all assets.', zh: '全球疫情恐慌。恐惧与贪婪跌至 12。BTC 数日内跌超 50% 但在所有资产中恢复最快。' },
        description: { en: ['BTC crashed from $9K to $3,800 in 48 hours - 58% drop', 'Fear & Greed hit 12 - comparable to today\'s 6', 'Cross-asset panic - stocks, commodities all crashed', 'Liquidity crisis across all markets'], zh: ['BTC 48 小时内从 $9K 崩至 $3,800——跌幅 58%', '恐惧与贪婪跌至 12——与今天的 6 可比', '跨资产恐慌——股票、大宗商品全面崩盘', '所有市场流动性危机'] },
        aftermath: { en: ['Absolute bottom at $3,800 in March 2020', 'Rallied 1,600%+ to $69K by November 2021 (19 months)', 'KEY: Extreme fear during liquidity crisis = best entry of the decade'], zh: ['2020 年 3 月绝对底部 $3,800', '到 2021 年 11 月涨至 $69K，涨幅超 1,600%（19 个月）', '关键：流动性危机期间的极度恐惧 = 十年最佳入场点'] }
      }
    }
  ],
  newsTimeline: [
    { id: 1, category: 'price', headline: { en: 'BTC Crashes to $60,008 - Steepest Single-Day Drop Since FTX', zh: 'BTC 暴跌至 $60,008 - FTX 以来最陡单日跌幅' }, content: { en: 'Bitcoin plunged 13% on February 5, hitting $60,008 intraday - the steepest single-day decline since the FTX collapse in November 2022. This erased all gains since October 2024.', zh: 'BTC 于 2 月 5 日暴跌 13%，盘中触及 $60,008——自 2022 年 11 月 FTX 崩盘以来最陡单日跌幅。这抹平了 2024 年 10 月以来的所有涨幅。' }, marketRelevance: { en: 'CRITICAL: Most severe price drop in 15+ months signals potential capitulation.', zh: '关键：15 个月以上最严重跌幅信号潜在投降。' } },
    { id: 2, category: 'price', headline: { en: 'V-Shape Recovery: BTC Rebounds 11% on Feb 6', zh: 'V 型反弹：BTC 2 月 6 日反弹 11%' }, content: { en: 'In a dramatic reversal, BTC surged from $60K lows to above $71,000 on February 6 - an 11% single-day gain, the largest since early 2023. Recovery took less than 24 hours.', zh: '戏剧性逆转中，BTC 于 2 月 6 日从 $60K 低点飙升至 $71,000 以上——11% 单日涨幅，为 2023 年初以来最大。恢复用时不到 24 小时。' }, marketRelevance: { en: 'CRITICAL: Recovery speed suggests institutional liquidity providing floor.', zh: '关键：恢复速度表明机构流动性提供支撑。' } },
    { id: 3, category: 'liquidation', headline: { en: '$2.6B Liquidated in 24 Hours - 10th Largest Event Ever', zh: '24 小时清算 26 亿美元 - 史上第 10 大事件' }, content: { en: 'Per Coinglass, $2.6 billion in crypto positions were liquidated on Feb 5-6, ranking as the 10th largest single-day liquidation event in history. 84% were long positions.', zh: '据 Coinglass，2 月 5-6 日加密头寸清算 26 亿美元，位列史上第 10 大单日清算事件。84% 为多头头寸。' }, marketRelevance: { en: 'CRITICAL: Historic liquidation levels often precede major bottoms.', zh: '关键：历史级清算水平往往先于重大底部。' } },
    { id: 4, category: 'liquidation', headline: { en: 'Open Interest Drops Below $100B - First Since March 2025', zh: '未平仓合约跌破 1000 亿 - 自 2025 年 3 月以来首次' }, content: { en: 'Derivatives open interest fell below $100 billion for the first time since March 2025, indicating massive deleveraging across the market.', zh: '衍生品未平仓合约自 2025 年 3 月以来首次跌破 1000 亿美元，表明市场全面去杠杆。' }, marketRelevance: { en: 'HIGH: Deleveraging creates healthier market structure long-term.', zh: '高：去杠杆长期创造更健康的市场结构。' } },
    { id: 5, category: 'sentiment', headline: { en: 'Fear & Greed Crashes to 6 - Lowest Since Terra Collapse', zh: '恐惧与贪婪暴跌至 6 - Terra 崩盘以来最低' }, content: { en: 'The Crypto Fear & Greed Index hit 6 on February 7 - the lowest reading since June 2022 (Terra collapse at 7). Only comparable readings: FTX (10), 519 (11), COVID (12).', zh: '加密恐惧与贪婪指数 2 月 7 日触及 6——自 2022 年 6 月（Terra 崩盘时 7）以来最低读数。唯一可比：FTX（10）、519（11）、COVID（12）。' }, marketRelevance: { en: 'CRITICAL: Readings below 15 have historically preceded 130-1600% rallies.', zh: '关键：低于 15 的读数历史上先于 130-1600% 的涨幅。' } },
    { id: 6, category: 'institutional', headline: { en: 'ETF Cumulative Outflows Hit $6.18B Since November', zh: 'ETF 累计流出自 11 月达 61.8 亿美元' }, content: { en: 'US spot BTC ETFs have seen $6.18 billion in cumulative outflows since November 2025 - the longest sustained outflow streak since their January 2024 launch.', zh: '美国现货 BTC ETF 自 2025 年 11 月累计流出 61.8 亿美元——自 2024 年 1 月上市以来最长持续流出期。' }, marketRelevance: { en: 'HIGH: ETF flows create real selling pressure but may be exhausting.', zh: '高：ETF 流出造成实际抛压但可能正在耗尽。' } },
    { id: 7, category: 'institutional', headline: { en: 'IBIT Records $10.7B Volume on Feb 5 - Mostly Selling', zh: 'IBIT 2 月 5 日成交量达 107 亿 - 主要为卖出' }, content: { en: 'BlackRock\'s IBIT saw record trading volume of $10.7 billion on February 5, with the majority being sell orders. Single-day outflow reached $528 million.', zh: '贝莱德 IBIT 2 月 5 日创纪录成交量 107 亿美元，大部分为卖单。单日流出达 5.28 亿美元。' }, marketRelevance: { en: 'HIGH: Record volume during panic often marks capitulation climax.', zh: '高：恐慌期间创纪录成交量往往标志投降高潮。' } },
    { id: 8, category: 'whale', headline: { en: 'Corporate Treasuries Hold 956K BTC - Not Selling', zh: '企业金库持有 95.6 万 BTC - 未抛售' }, content: { en: '190+ companies collectively hold 956,000 BTC (4.5% of supply). Despite the crash, corporate treasuries including Strategy (MSTR) are NOT selling their holdings.', zh: '190+ 家公司共持有 956,000 BTC（占供应量 4.5%）。尽管崩盘，包括 Strategy（MSTR）在内的企业金库未抛售持仓。' }, marketRelevance: { en: 'HIGH: Corporate diamond hands signal long-term conviction intact.', zh: '高：企业钻石手信号长期信念完好。' } },
    { id: 9, category: 'whale', headline: { en: 'MSTR Reports $12.4B Unrealized Q4 Loss - No Margin Call Risk', zh: 'MSTR 报告 Q4 未实现亏损 124 亿 - 无追保风险' }, content: { en: 'Strategy (MSTR) reported $12.4 billion in unrealized losses for Q4 2025. However, the company faces no margin call risk until BTC drops to approximately $8,000.', zh: 'Strategy（MSTR）报告 2025 年 Q4 未实现亏损 124 亿美元。然而，公司直到 BTC 跌至约 $8,000 才面临追保风险。' }, marketRelevance: { en: 'MEDIUM-HIGH: Removes corporate forced selling overhang.', zh: '中高：消除企业被迫抛售的悬念。' } },
    { id: 10, category: 'whale', headline: { en: 'Tether Mints ~$2B USDT in 48 Hours During Crash', zh: 'Tether 在崩盘期间 48 小时铸造约 20 亿 USDT' }, content: { en: 'Tether minted approximately $2 billion in USDT during the Feb 5-6 crash period, providing critical liquidity injection to the market.', zh: 'Tether 在 2 月 5-6 日崩盘期间铸造约 20 亿 USDT，为市场提供关键流动性注入。' }, marketRelevance: { en: 'HIGH: Liquidity injection often precedes market stabilization.', zh: '高：流动性注入往往先于市场稳定。' } },
    { id: 11, category: 'macro', headline: { en: 'Silver Crashes 30% - Worst Single Day Since 1980', zh: '白银暴跌 30% - 自 1980 年以来最差单日' }, content: { en: 'Silver prices crashed 30% in a single day - the worst daily decline since March 1980. Gold dropped 12%. Broad commodity selloff indicates cross-asset risk-off.', zh: '白银单日暴跌 30%——自 1980 年 3 月以来最差单日跌幅。黄金跌 12%。大宗商品全面抛售表明跨资产避险。' }, marketRelevance: { en: 'HIGH: Cross-asset correlation breaking digital gold narrative.', zh: '高：跨资产相关性打破数字黄金叙事。' } },
    { id: 12, category: 'macro', headline: { en: 'Kevin Warsh Named Fed Chair - Markets View as Hawkish', zh: 'Kevin Warsh 被任命美联储主席 - 市场视为鹰派' }, content: { en: 'Kevin Warsh has been nominated to succeed Jerome Powell as Federal Reserve Chair. Markets interpret this as hawkish, reducing expectations for near-term rate cuts.', zh: 'Kevin Warsh 被提名接替 Jerome Powell 担任美联储主席。市场将此解读为鹰派，降低近期降息预期。' }, marketRelevance: { en: 'HIGH: Fed policy remains dominant macro driver for risk assets.', zh: '高：美联储政策仍是风险资产的主导宏观驱动力。' } },
    { id: 13, category: 'macro', headline: { en: 'Michael Burry Warns of BTC "Death Spiral" Risk', zh: 'Michael Burry 警告 BTC "死亡螺旋"风险' }, content: { en: '"Big Short" Michael Burry warns that BTC decline could trigger a "death spiral" for companies with large BTC reserves. Says BTC has "no organic use case."', zh: '"大空头" Michael Burry 警告 BTC 下跌可能触发持有大量 BTC 储备公司的"死亡螺旋"。称 BTC "没有有机用例"。' }, marketRelevance: { en: 'MEDIUM: High-profile bearish commentary, but Burry often early.', zh: '中：高调看空评论，但 Burry 经常过早。' } },
    { id: 14, category: 'ecosystem', headline: { en: 'Weekly RSI Drops Below 21 - Third Lowest in BTC History', zh: '周线 RSI 跌破 21 - BTC 历史第三低' }, content: { en: 'Bitcoin\'s weekly RSI indicator fell below 21, marking the third-lowest oversold reading in its entire trading history. Previous extremes preceded major rallies.', zh: 'BTC 周线 RSI 指标跌破 21，标志着其整个交易历史中第三低的超卖读数。之前的极端值先于重大涨幅。' }, marketRelevance: { en: 'HIGH: Technical extremes often mark sentiment capitulation.', zh: '高：技术极端值往往标志情绪投降。' } },
    { id: 15, category: 'ecosystem', headline: { en: 'Put Premium Over Calls Hits 20+ Points - Extreme Fear', zh: '看跌期权溢价超看涨 20+ 点 - 极度恐惧' }, content: { en: 'Options market shows put premium exceeding calls by 20+ points. IBIT 1-year skew rose above 25 points. This extreme positioning often precedes reversals.', zh: '期权市场显示看跌期权溢价超过看涨 20+ 点。IBIT 1 年偏斜升至 25 点以上。这种极端持仓往往先于逆转。' }, marketRelevance: { en: 'HIGH: Extreme options positioning often marks sentiment extremes.', zh: '高：极端期权持仓往往标志情绪极端。' } },
    { id: 16, category: 'sentiment', headline: { en: 'Polymarket: 56% Odds BTC Hits $70K or Below in February', zh: 'Polymarket：56% 概率 BTC 在 2 月触及 $70K 或以下' }, content: { en: 'Prediction markets show 56% probability that BTC will hit $70,000 or below during February 2026, reflecting heightened uncertainty and fear.', zh: '预测市场显示 56% 概率 BTC 将在 2026 年 2 月触及 $70,000 或以下，反映加剧的不确定性和恐惧。' }, marketRelevance: { en: 'MEDIUM: Prediction markets often reflect current sentiment extremes.', zh: '中：预测市场往往反映当前情绪极端。' } },
    { id: 17, category: 'sentiment', headline: { en: 'Market Mood: "Fear and Fatigue" - Classic Capitulation', zh: '市场情绪："恐惧与疲惫" - 经典投降' }, content: { en: 'Market participants widely report "fear and fatigue" - language historically associated with capitulation phases. Bottom formation process typically follows.', zh: '市场参与者普遍报告"恐惧与疲惫"——历史上与投降阶段相关的语言。通常随后是底部形成过程。' }, marketRelevance: { en: 'HIGH: Capitulation language often marks sentiment extremes.', zh: '高：投降语言往往标志情绪极端。' } },
    { id: 18, category: 'liquidation', headline: { en: '$120M+ Short Liquidations in 1 Hour on Feb 6 Rebound', zh: '2 月 6 日反弹 1 小时内超 1.2 亿空头清算' }, content: { en: 'The sharp V-shape recovery on February 6 caught shorts off guard, triggering $120M+ in short liquidations within just one hour.', zh: '2 月 6 日急剧 V 型反弹令空头措手不及，1 小时内触发超 1.2 亿美元空头清算。' }, marketRelevance: { en: 'HIGH: Short squeeze validates recovery strength.', zh: '高：空头挤压验证复苏强度。' } }
  ]
};

const SentimentGauge = ({ score }) => {
  const { t } = useLanguage();
  const { isMobile } = useResponsive();
  const zones = [
    { label: t('extremeFear'), range: [0, 20], color: '#DC2626', bg: '#FEE2E2' },
    { label: t('fear'), range: [20, 40], color: '#F97316', bg: '#FFEDD5' },
    { label: t('neutral'), range: [40, 60], color: '#A8A29E', bg: '#F5F5F4' },
    { label: t('optimistic'), range: [60, 80], color: '#84CC16', bg: '#ECFCCB' },
    { label: t('extremeGreed'), range: [80, 100], color: '#22C55E', bg: '#DCFCE7' },
  ];
  const getColor = (s) => s < 20 ? '#DC2626' : s < 40 ? '#F97316' : s < 60 ? '#78716C' : s < 80 ? '#84CC16' : '#22C55E';
  const getLabel = (s) => s < 20 ? t('extremeFear') : s < 40 ? t('fear') : s < 60 ? t('neutral') : s < 80 ? t('optimistic') : t('extremeGreed');
  const currentZone = zones.find(z => score >= z.range[0] && score < z.range[1]) || zones[0];
  const angle = -180 + (score / 100) * 180;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0' }}>
      <div style={{ position: 'relative', width: isMobile ? 260 : 320, height: isMobile ? 150 : 180 }}>
        <svg viewBox="0 0 340 190" style={{ width: '100%', height: '100%' }}>
          <path d="M 20 170 A 150 150 0 0 1 320 170" fill="none" stroke="#F5F5F4" strokeWidth="36" strokeLinecap="round" />
          {zones.map((zone, i) => {
            const s = -180 + (zone.range[0] / 100) * 180, e = -180 + (zone.range[1] / 100) * 180;
            const sr = (s * Math.PI) / 180, er = (e * Math.PI) / 180;
            return <path key={i} d={`M ${170 + 150 * Math.cos(sr)} ${170 + 150 * Math.sin(sr)} A 150 150 0 0 1 ${170 + 150 * Math.cos(er)} ${170 + 150 * Math.sin(er)}`} fill="none" stroke={zone.color} strokeWidth="32" opacity={currentZone === zone ? 1 : 0.3} />;
          })}
          <text x="15" y="185" fontSize="11" fill="#A8A29E">0</text>
          <text x="162" y="35" fontSize="11" fill="#A8A29E" textAnchor="middle">50</text>
          <text x="310" y="185" fontSize="11" fill="#A8A29E">100</text>
          <g>
            <line x1={170 - 25 * Math.cos(angle * Math.PI / 180)} y1={170 - 25 * Math.sin(angle * Math.PI / 180)} x2={170 + 120 * Math.cos(angle * Math.PI / 180)} y2={170 + 120 * Math.sin(angle * Math.PI / 180)} stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
            <circle cx="170" cy="170" r="16" fill="#1C1917" />
            <circle cx="170" cy="170" r="8" fill="#FAFAF9" />
            <circle cx="170" cy="170" r="4" fill={getColor(score)} />
          </g>
        </svg>
      </div>
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#78716C' }}>{t('mssScore')}</span>
          <span style={{ fontSize: isMobile ? '48px' : '56px', fontWeight: '700', color: getColor(score), lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: '18px', color: '#A8A29E' }}>/ 100</span>
        </div>
        <div style={{ fontSize: '20px', color: getColor(score), marginTop: '8px', fontWeight: '600' }}>{getLabel(score)}</div>
        <div style={{ fontSize: '12px', color: currentZone.color, marginTop: '8px', padding: '6px 14px', background: currentZone.bg, borderRadius: '20px', display: 'inline-block', fontWeight: '500' }}>{t('extremeFearZone')}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '20px', flexWrap: 'wrap' }}>
        {zones.map((z, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: currentZone === z ? z.bg : 'transparent', borderRadius: '20px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: z.color, opacity: currentZone === z ? 1 : 0.4 }} />
            <span style={{ fontSize: '11px', color: currentZone === z ? z.color : '#A8A29E', fontWeight: currentZone === z ? '600' : '400' }}>{z.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DriverCard = ({ driver, expanded, onToggle }) => {
  const { t, lang } = useLanguage();
  const getColor = (s) => s < 20 ? '#DC2626' : s < 35 ? '#F97316' : s < 50 ? '#EAB308' : s < 65 ? '#84CC16' : '#22C55E';
  const getBg = (s) => s < 20 ? '#FEE2E2' : s < 35 ? '#FFEDD5' : s < 50 ? '#FEF3C7' : s < 65 ? '#ECFCCB' : '#DCFCE7';
  const labels = { tapeStructure: t('tapeStructure'), leverageLiquidations: t('leverageLiquidations'), institutionalFlows: t('institutionalFlows'), macroRisks: t('macroRisks'), socialNarrative: t('socialNarrative') };

  return (
    <div style={{ background: '#FFF', border: expanded ? `2px solid ${getColor(driver.score)}` : '1px solid #E7E5E4', borderRadius: '12px', overflow: 'hidden' }}>
      <div onClick={onToggle} style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', background: expanded ? getBg(driver.score) : 'transparent' }}>
        <span style={{ fontSize: '28px' }}>{driver.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#1C1917' }}>{labels[driver.key]}</span>
            <span style={{ fontSize: '11px', color: '#78716C', padding: '2px 8px', background: '#F5F5F4', borderRadius: '10px' }}>{t('weight')}: {driver.weight}%</span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: getColor(driver.score) }}>{driver.direction[lang]}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: `conic-gradient(${getColor(driver.score)} ${driver.score}%, #E7E5E4 0%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: '700', color: getColor(driver.score) }}>{driver.score}</span>
            </div>
          </div>
          <span style={{ transform: expanded ? 'rotate(180deg)' : '', transition: 'transform 0.2s', color: '#A8A29E' }}>▼</span>
        </div>
      </div>
      {expanded && (
        <div style={{ padding: '20px', borderTop: '1px solid #E7E5E4', background: '#FAFAF9' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#57534E', marginBottom: '12px', textTransform: 'uppercase' }}>📋 {t('evidence')}</div>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '14px', color: '#44403C', lineHeight: 1.8 }}>
              {driver.evidence[lang].map((item, i) => <li key={i} style={{ marginBottom: '10px' }}>{item}</li>)}
            </ul>
          </div>
          <div style={{ marginBottom: '20px', padding: '16px', background: '#FFF', borderRadius: '10px', border: '1px solid #E7E5E4' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#57534E', marginBottom: '10px', textTransform: 'uppercase' }}>🔍 {t('analysis')}</div>
            <div style={{ fontSize: '14px', color: '#44403C', lineHeight: 1.8 }}>{driver.analysis[lang]}</div>
          </div>
          <div style={{ padding: '14px 16px', background: getBg(driver.score), borderRadius: '8px', borderLeft: `4px solid ${getColor(driver.score)}` }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#57534E', marginBottom: '8px', textTransform: 'uppercase' }}>🎯 {t('conclusion')}</div>
            <div style={{ fontSize: '14px', color: getColor(driver.score), lineHeight: 1.6, fontWeight: '500' }}>{driver.conclusion[lang]}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const HistoricalCard = ({ event, expanded, onToggle }) => {
  const { t, lang } = useLanguage();
  const getColor = (s) => s < 20 ? '#DC2626' : s < 35 ? '#F97316' : s < 50 ? '#EAB308' : s < 65 ? '#84CC16' : '#22C55E';
  const labels = { tapeStructure: lang === 'zh' ? '价格与结构' : 'Tape', leverageLiquidations: lang === 'zh' ? '杠杆与清算' : 'Leverage', institutionalFlows: lang === 'zh' ? '机构/链上' : 'Institutional', macroRisks: lang === 'zh' ? '宏观' : 'Macro', socialNarrative: lang === 'zh' ? '社交叙事' : 'Narrative' };

  return (
    <div style={{ background: '#FFF', border: '1px solid #E7E5E4', borderRadius: '12px', overflow: 'hidden' }}>
      <div onClick={onToggle} style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', background: expanded ? '#F5F5F4' : 'transparent' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: getColor(event.driverScore), background: '#F5F5F4', padding: '3px 10px', borderRadius: '12px' }}>{labels[event.driverKey]} ({event.driverScore})</span>
            <span style={{ fontSize: '12px', color: '#78716C' }}>{event.event.time}</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1C1917' }}>{event.event.title[lang]}</div>
        </div>
        <span style={{ transform: expanded ? 'rotate(180deg)' : '', transition: 'transform 0.2s', color: '#A8A29E' }}>▼</span>
      </div>
      {expanded && (
        <div style={{ padding: '20px', borderTop: '1px solid #E7E5E4', background: '#FAFAF9' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#57534E', marginBottom: '10px', textTransform: 'uppercase' }}>📖 {t('backgroundContext')}</div>
            <div style={{ fontSize: '14px', color: '#44403C', lineHeight: 1.8, padding: '14px', background: '#FFF', borderRadius: '8px', border: '1px solid #E7E5E4' }}>{event.event.background[lang]}</div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#57534E', marginBottom: '10px', textTransform: 'uppercase' }}>📋 {t('marketConditions')}</div>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '14px', color: '#44403C', lineHeight: 1.8 }}>
              {event.event.description[lang].map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>{item}</li>)}
            </ul>
          </div>
          <div style={{ padding: '16px', background: '#EFF6FF', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#1E40AF', marginBottom: '12px', textTransform: 'uppercase' }}>📈 {t('whatHappened')}</div>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: '14px', color: '#1E3A8A', lineHeight: 1.8 }}>
              {event.event.aftermath[lang].map((item, i) => <li key={i} style={{ marginBottom: '6px' }}>{item}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const NewsCard = ({ item, expanded, onToggle }) => {
  const { t, lang } = useLanguage();
  const cats = { price: { color: '#DC2626', bg: '#FEE2E2', icon: '📉' }, liquidation: { color: '#F97316', bg: '#FFEDD5', icon: '⚡' }, whale: { color: '#22C55E', bg: '#DCFCE7', icon: '🐋' }, institutional: { color: '#3B82F6', bg: '#DBEAFE', icon: '🏛️' }, macro: { color: '#8B5CF6', bg: '#EDE9FE', icon: '🌍' }, ecosystem: { color: '#06B6D4', bg: '#CFFAFE', icon: '🔗' }, sentiment: { color: '#A8A29E', bg: '#F5F5F4', icon: '💭' } };
  const cat = cats[item.category] || cats.sentiment;

  return (
    <div style={{ background: '#FFF', border: '1px solid #E7E5E4', borderRadius: '12px', overflow: 'hidden' }}>
      <div onClick={onToggle} style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{cat.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: '600', color: '#1C1917', lineHeight: 1.5, marginBottom: '6px' }}>{item.headline[lang]}</div>
          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px', background: cat.bg, color: cat.color, fontWeight: '500' }}>{cat.icon} {item.category}</span>
        </div>
        <span style={{ transform: expanded ? 'rotate(180deg)' : '', transition: 'transform 0.2s', color: '#A8A29E', flexShrink: 0 }}>▼</span>
      </div>
      {expanded && (
        <div style={{ padding: '20px', borderTop: '1px solid #F5F5F4', background: '#FAFAF9' }}>
          <div style={{ fontSize: '14px', color: '#44403C', lineHeight: 1.8, marginBottom: '16px' }}>{item.content[lang]}</div>
          <div style={{ padding: '12px 14px', background: cat.bg, borderRadius: '8px', borderLeft: `3px solid ${cat.color}` }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: cat.color, marginBottom: '4px', textTransform: 'uppercase' }}>{t('marketRelevance')}</div>
            <div style={{ fontSize: '13px', color: cat.color, fontWeight: '500' }}>{item.marketRelevance[lang]}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const MainContent = () => {
  const { lang, t } = useLanguage();
  const { isMobile } = useResponsive();
  const [expandedDriver, setExpandedDriver] = useState(0);
  const [expandedEvent, setExpandedEvent] = useState(0);
  const [expandedNews, setExpandedNews] = useState(null);
  const [newsFilter, setNewsFilter] = useState('all');

  const filteredNews = newsFilter === 'all' ? reportData.newsTimeline : reportData.newsTimeline.filter(n => n.category === newsFilter);
  const categories = ['all', 'price', 'liquidation', 'whale', 'institutional', 'macro', 'ecosystem', 'sentiment'];
  const catLabels = { all: lang === 'zh' ? '全部' : 'All', price: lang === 'zh' ? '价格' : 'Price', liquidation: lang === 'zh' ? '清算' : 'Liquidation', whale: lang === 'zh' ? '鲸鱼' : 'Whale', institutional: lang === 'zh' ? '机构' : 'Institutional', macro: lang === 'zh' ? '宏观' : 'Macro', ecosystem: lang === 'zh' ? '生态' : 'Ecosystem', sentiment: lang === 'zh' ? '情绪' : 'Sentiment' };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FAFAF9 0%, #F5F5F4 100%)', fontFamily: '"Inter", -apple-system, sans-serif', color: '#1C1917', lineHeight: 1.7 }}>
      <header style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '20px 16px 24px' : '32px 24px 40px', borderBottom: '1px solid #E7E5E4' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', color: '#FFF', background: '#DC2626', padding: '4px 12px', borderRadius: '6px', fontWeight: '600' }}>🚨 {reportData.date} - EXTREME FEAR (6)</span>
          <LanguageToggle />
        </div>
        <h1 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: '600', margin: '0 0 10px', color: '#0C0A09' }}>{t('pageTitle')}</h1>
        <p style={{ fontSize: '15px', color: '#78716C', margin: '0 0 12px' }}>{t('pageSubtitle')}</p>
        <div style={{ fontSize: '12px', color: '#A8A29E' }}>{t('dataSource')}: {reportData.dataSource[lang]}</div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '0 16px 60px' : '0 24px 80px' }}>
        <section style={{ padding: isMobile ? '32px 0' : '48px 0', borderBottom: '1px solid #E7E5E4' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A8A29E', margin: '0 0 6px' }}>{lang === 'zh' ? '一' : '01'} | {t('marketPulse')}</h2>
            <p style={{ fontSize: '15px', color: '#78716C', margin: 0 }}>{t('marketPulseDesc')}</p>
          </div>
          <div style={{ background: '#FFF', border: '2px solid #DC2626', borderRadius: '16px', padding: isMobile ? '20px 16px' : '28px 24px', marginBottom: '24px', boxShadow: '0 4px 24px rgba(220,38,38,0.1)' }}>
            <SentimentGauge score={reportData.mssScore} />
            <div style={{ marginTop: '16px', padding: '14px 18px', background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '10px', fontSize: '13px', color: '#991B1B', lineHeight: 1.6, textAlign: 'center' }}>
              <strong>⚠️ {t('meaningLabel')}:</strong> {lang === 'zh' ? 'MSS 读数 6 为 Terra 崩盘以来最低（当时为 7）。历史上恐惧与贪婪低于 15 的读数总是先于重大周期底部，随后 6-18 个月回报 +130% 至 +1,600%。' : 'MSS reading of 6 is the lowest since Terra collapse (which hit 7). Historically, Fear & Greed readings below 15 have ALWAYS preceded major cycle bottoms with 6-18 month returns of +130% to +1,600%.'}
            </div>
          </div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#57534E', margin: '0 0 16px' }}>{t('contributingFactors')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reportData.drivers.map((d, i) => <DriverCard key={d.key} driver={d} expanded={expandedDriver === i} onToggle={() => setExpandedDriver(expandedDriver === i ? -1 : i)} />)}
          </div>
        </section>

        <section style={{ padding: isMobile ? '32px 0' : '48px 0', borderBottom: '1px solid #E7E5E4' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A8A29E', margin: '0 0 6px' }}>{lang === 'zh' ? '二' : '02'} | {t('historicalReplay')}</h2>
            <p style={{ fontSize: '15px', color: '#78716C', margin: 0 }}>{t('historicalReplayDesc')}</p>
          </div>
          <div style={{ padding: '12px 16px', background: '#DCFCE7', border: '1px solid #BBF7D0', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', color: '#166534' }}>
            💡 {lang === 'zh' ? '关键洞察：恐惧与贪婪指数 6 是 Terra 崩盘以来最低。历史模式显示：此类极端读数（Terra 7、FTX 10、519 11、COVID 12）之后 6-18 个月回报范围为 +130% 至 +1,600%。' : 'KEY INSIGHT: Fear & Greed at 6 is the lowest since Terra collapse. Historical pattern: such extreme readings (Terra 7, FTX 10, 519 11, COVID 12) have been followed by 6-18 month returns ranging from +130% to +1,600%.'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reportData.historicalEvents.map((e, i) => <HistoricalCard key={i} event={e} expanded={expandedEvent === i} onToggle={() => setExpandedEvent(expandedEvent === i ? -1 : i)} />)}
          </div>
        </section>

        <section style={{ padding: isMobile ? '32px 0' : '48px 0' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A8A29E', margin: '0 0 6px' }}>{lang === 'zh' ? '三' : '03'} | {t('newsTimeline')}</h2>
            <p style={{ fontSize: '15px', color: '#78716C', margin: 0 }}>{t('newsTimelineDesc')}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', padding: '12px 16px', background: '#FFF', borderRadius: '10px', border: '1px solid #E7E5E4' }}>
            {categories.map(c => {
              const count = c === 'all' ? reportData.newsTimeline.length : reportData.newsTimeline.filter(n => n.category === c).length;
              return (
                <button key={c} onClick={() => setNewsFilter(c)} style={{
                  padding: '6px 14px', fontSize: '12px', fontWeight: newsFilter === c ? '600' : '400',
                  border: newsFilter === c ? '2px solid #1C1917' : '1px solid #E7E5E4', borderRadius: '20px',
                  background: newsFilter === c ? '#1C1917' : '#FFF', color: newsFilter === c ? '#FFF' : '#57534E', cursor: 'pointer'
                }}>{catLabels[c]} ({count})</button>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredNews.map((item) => <NewsCard key={item.id} item={item} expanded={expandedNews === item.id} onToggle={() => setExpandedNews(expandedNews === item.id ? null : item.id)} />)}
          </div>
        </section>
      </main>

      <footer style={{ maxWidth: '900px', margin: '0 auto', padding: '24px', textAlign: 'center', borderTop: '1px solid #E7E5E4' }}>
        <div style={{ fontSize: '12px', color: '#A8A29E' }}>{t('reportDate')}: {reportData.date} | {t('dataSource')}: {reportData.dataSource[lang]}</div>
        <div style={{ fontSize: '11px', color: '#D6D3D1', marginTop: '8px' }}>
          {lang === 'zh' ? '⚠️ 免责声明：本报告仅供信息参考，不构成投资建议。加密货币投资风险极高，请谨慎决策。' : '⚠️ Disclaimer: This report is for informational purposes only and does not constitute investment advice. Cryptocurrency investments carry extreme risk.'}
        </div>
      </footer>
    </div>
  );
};

export default function CryptoRadarReport() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
