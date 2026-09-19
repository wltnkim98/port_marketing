import React, { useState, useEffect, useRef } from 'react';
import {Link} from "react-router-dom";

// 마케팅 진단 추천 질문 칩
const QUICK_QUESTIONS = [
    "광고비는 늘렸는데 ROAS가 계속 떨어져요.",
    "상세페이지 유입은 많은데 구매 전환이 안 나와요.",
    "SNS 팔로워는 늘어나는데 실제 매출로 안 이어집니다.",
    "초기 브랜드라 신규 고객 유입 단가(CAC)가 너무 높아요."
];

const Ai = () => {
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text: '안녕하세요. MARKETWITH AI 마케팅 진단 디렉터입니다.\n현재 마케팅에서 가장 고민되는 문제(전환율, 유입, 광고 효율, 이탈 등)를 말씀해 주시거나 아래 추천 질문을 선택해 보세요.'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const chatContainerRef = useRef(null);

    // 채팅 박스 내부만 자동 하단 스크롤 (전체 윈도우 스크롤 방지)
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const send = async (userText) => {
        const txt = (userText || input).trim();
        if (!txt || loading) return;

        const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "AQ.Ab8RN6J27nLCswRmp6Ide-UQQ6K-E-EclpF1OGK8-VS2lhcNkQ";

        setInput('');
        const updatedMessages = [...messages, { role: 'user', text: txt }];
        // 화면에 사용자 메시지와 빈 봇 메시지(스트리밍 수신용) 추가
        setMessages([...updatedMessages, { role: 'bot', text: '' }]);
        setLoading(true);

        try {
            // Gemini 대화 히스토리 형식으로 변환 (첫 안내문 제외)
            let validHistory = updatedMessages
                .filter((m, idx) => idx > 0 && m.text && m.text.trim())
                .map(m => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.text }]
                }));

            // Gemini API는 첫 번째 턴이 반드시 'user'이어야 함
            while (validHistory.length > 0 && validHistory[0].role !== 'user') {
                validHistory.shift();
            }

            const systemPrompt = `당신은 마케팅 전문 컨설팅 'MARKETWITH'의 AI 진단 디렉터입니다.
사용자의 마케팅 문제를 듣고 아래 형식에 맞춰 300자 내외로 전문적이고 명확하게 진단하세요:
1. 🎯 핵심 문제 재정의 (증상 vs 원인 구분)
2. 🔍 가장 가능성 높은 근본 원인 2가지
1, 2번을 제시한 뒤 사이트의 심층 컨설팅 문의를 유도할 수 있는 권유 문구를 부드럽게 제시하세요.
전문적이고 날카로운 실무 마케터의 톤앤매너로 작성하세요.`;

            // 초고속 경량 모델인 gemini-3.5-flash-lite 사용 (1초대 즉시 응답)
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: {
                            parts: [{ text: systemPrompt }]
                        },
                        contents: validHistory,
                        generationConfig: {
                            maxOutputTokens: 800,
                            temperature: 0.7
                        }
                    })
                }
            );

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                const errMsg = errData.error?.message || `API 오류 (${res.status})`;
                setMessages(prev => {
                    const next = [...prev];
                    next[next.length - 1] = { role: 'bot', text: `⚠️ 오류: ${errMsg}` };
                    return next;
                });
                setLoading(false);
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let botReply = '';
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                // 아직 완성되지 않은 마지막 줄은 버퍼에 유지
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.replace('data: ', '').trim();
                        if (!jsonStr) continue;
                        try {
                            const parsed = JSON.parse(jsonStr);
                            const token = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
                            if (token) {
                                botReply += token;
                                setMessages(prev => {
                                    const next = [...prev];
                                    next[next.length - 1] = { role: 'bot', text: botReply };
                                    return next;
                                });
                            }
                        } catch (e) {
                            // JSON 파싱 무시
                        }
                    }
                }
            }

            if (!botReply.trim()) {
                setMessages(prev => {
                    const next = [...prev];
                    next[next.length - 1] = { role: 'bot', text: '응답을 받지 못했습니다. 다시 시도해 주세요.' };
                    return next;
                });
            }
        } catch (e) {
            setMessages(prev => {
                const next = [...prev];
                next[next.length - 1] = { role: 'bot', text: '⚠️ 연결 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' };
                return next;
            });
        }
        setLoading(false);
    };

    return (
        <section className="ai-section" id="ai">
            <h2 className="section-title fade-up fade-up-delay-1">지금 당장<br />진단해보세요</h2>
            <div className="ai-container">
                <div className="ai-left fade-up fade-up-delay-2">
                    <div className="ai-badge">AI 실시간 진단 · 무료</div>
                    <p className="ai-intro">
                        마케팅 고민이 있으신가요?
                        마켓위드의 AI 컨설턴트에게 진단을 맡겨 보세요. <br />
                        현재 가지고 계신 마케팅 문제를 자유롭게 입력하시면,
                        <strong> 증상과 원인을 분리</strong>해 핵심 문제를 짚어드립니다.
                    </p>

                    {/* 추천 질문 칩 */}
                    <div style={{ marginTop: '16px' }}>
                        <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>자주 묻는 진단 주제:</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {QUICK_QUESTIONS.map((q, i) => (
                                <button
                                    key={i}
                                    style={{
                                        textAlign: 'left',
                                        background: 'rgba(255,255,255,0.5)',
                                        border: '1px solid rgba(255,255,255,0.5)',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        color: '#000',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onClick={() => send(q)}
                                    disabled={loading}
                                >
                                    💬 {q}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Link to="/consult" className="btn-round fade-up fade-up-delay-3">
                        심층 컨설팅 신청하기 →
                    </Link>
                </div>

                <div className="ai-right fade-up fade-up-delay-4">
                    <div className="ai-messages" ref={chatContainerRef}>
                        {messages.map((m, i) => (
                            // 빈 텍스트(스트리밍 직전)는 렌더링 제외
                            m.text ? (
                                <div key={i} className={`ai-msg ${m.role}`} style={{ whiteSpace: 'pre-wrap' }}>
                                    {m.text}
                                </div>
                            ) : null
                        ))}
                        {loading && messages[messages.length - 1]?.text === '' && (
                            <div className="ai-msg typing">
                                <span/><span/><span/>
                            </div>
                        )}
                    </div>
                    <div className="ai-input-row">
                        <input
                            className="ai-input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    send();
                                }
                            }}
                            placeholder="예: 광고비는 늘었는데 ROAS가 떨어지고 있어요..."
                            disabled={loading}
                        />
                        <button className="ai-send" onClick={() => send()} disabled={loading || !input.trim()}>
                            진단하기
                        </button>
                    </div>
                    <p className="ai-disclaimer">자세한 상담은 심층 컨설팅을 통해 상담 받으실 수 있습니다.</p>
                </div>
            </div>
        </section>
    );
};

export default Ai;