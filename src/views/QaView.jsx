import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const QaView = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        questionerName: '',
        question: '',
        password: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [privatePost, setPrivatePost] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [editingPost, setEditingPost] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        question: '',
        password: ''
    });
    const [openQaIndex, setOpenQaIndex] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

    useEffect(() => {
        fetchQuestions();
    }, [currentPage]);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/support/qa?page=${currentPage}&status=all`);
            const data = await response.json();
            
            if (data.success) {
                setQuestions(data.data);
                setTotalPages(data.pagination.pages);
            }
        } catch (error) {
            console.error('Q&A 조회 에러:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!formData.question.trim()) {
            alert('질문 내용을 입력해주세요.');
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/api/support/qa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    questionerName: formData.questionerName || '익명',
                    question: formData.question,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message || '질문이 등록되었습니다. 답변은 영업일 기준 48시간 이내에 등록됩니다.');
                setFormData({ title: '', questionerName: '', question: '', password: '' });
                setShowForm(false);
                setCurrentPage(1);
                fetchQuestions();
            } else {
                alert(data.message || '질문 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('질문 등록 에러:', error);
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setSubmitting(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleViewPrivatePost = (qa) => {
        setPrivatePost(qa);
        setShowPasswordModal(true);
        setPasswordInput('');
    };

    const handlePasswordSubmit = async () => {
        if (!passwordInput.trim()) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/support/qa/${privatePost._id}?password=${passwordInput}`);
            const data = await response.json();

            if (data.success && !data.requirePassword) {
                // 비밀번호 확인 성공, 해당 게시글 업데이트
                setQuestions(prevQuestions => 
                    prevQuestions.map(q => 
                        q._id === privatePost._id ? data.data : q
                    )
                );
                setShowPasswordModal(false);
                setPrivatePost(null);
                setPasswordInput('');
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('비밀번호 확인 에러:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    const handleEditPost = (qa) => {
        setEditingPost(qa);
        setEditFormData({
            title: qa.title,
            question: qa.question,
            password: ''
        });
    };

    const handleEditSubmit = async () => {
        if (!editFormData.title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!editFormData.question.trim()) {
            alert('질문 내용을 입력해주세요.');
            return;
        }

        if (editingPost.isPrivate && !editFormData.password.trim()) {
            alert('비밀글 수정을 위해 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/support/qa/${editingPost._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: editFormData.title,
                    question: editFormData.question,
                    password: editFormData.password
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('질문이 수정되었습니다.');
                setQuestions(prevQuestions => 
                    prevQuestions.map(q => 
                        q._id === editingPost._id ? data.data : q
                    )
                );
                setEditingPost(null);
                setEditFormData({ title: '', question: '', password: '' });
            } else {
                alert(data.message || '수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('질문 수정 에러:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
        setEditFormData({ title: '', question: '', password: '' });
    };

    return (
        <div className="qa-page">
            <Header />
            
            <main className="qa-content">
                <section className="qa-header-section">
                    <h1 className="qa-title">1:1 문의 게시판</h1>
                    <p className="qa-subtitle">
                        마켓위드 문의 게시판입니다.<br />
                    </p>
                </section>
                <section className="qa-btn-section">
                    <p className="qa-description">
                        유선상담 <strong>1600-5678</strong> <br />
                        자세한 컨설팅 상담은 컨설팅 신청 페이지를 통해 신청해 주세요.
                    </p>
                    <button
                        className="qa-write-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? (
                            <span>닫기 <span style={{marginLeft: '8px'}}>×</span></span>
                        ) : '질문하기'}
                    </button>
                </section>

                {showForm && (
                    <section className="qa-form-section">
                        <form onSubmit={handleSubmit} className="qa-form">
                            <div className="form-group">
                                <label>제목 *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="제목을 입력해주세요"
                                    required
                                    maxLength={50}
                                />
                            </div>
                            <div className="form-group">
                                <label>이름 (선택)</label>
                                <input
                                    type="text"
                                    value={formData.questionerName}
                                    onChange={(e) => setFormData({...formData, questionerName: e.target.value})}
                                    placeholder="익명"
                                    maxLength={50}
                                />
                            </div>
                            <div className="form-group">
                                <label>질문 내용 *</label>
                                <textarea
                                    value={formData.question}
                                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                                    placeholder="질문 내용을 입력해주세요."
                                    required
                                    maxLength={2000}
                                    rows={5}
                                />
                            </div>
                            <div className="form-group">
                                <label>비밀번호 (선택 - 입력 시 비밀글로 등록됩니다)</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    placeholder="비밀번호 (4자 이상)"
                                    minLength={4}
                                    maxLength={20}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="qa-submit-btn"
                                disabled={submitting}
                            >
                                {submitting ? '등록 중...' : '질문 등록'}
                            </button>
                        </form>
                    </section>
                )}

                <section className="qa-list-section">
                    {loading ? (
                        <div className="qa-loading">로딩 중...</div>
                    ) : questions.length === 0 ? (
                        <div className="qa-empty">
                            <p>아직 등록된 Q&A가 없습니다.</p>
                        </div>
                    ) : (
                        <div className="qa-list">
                            {questions.map((qa, idx) => {
                                const isOpen = openQaIndex === idx;
                                return (
                                    <div key={qa._id} className={`qa-item ${isOpen ? 'open' : ''}`}>
                                        {editingPost && editingPost._id === qa._id ? (
                                            <div className="qa-edit-form">
                                                <div className="form-group">
                                                    <label>제목 *</label>
                                                    <input
                                                        type="text"
                                                        value={editFormData.title}
                                                        onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                                                        placeholder="제목을 입력해주세요"
                                                        required
                                                        maxLength={50}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>질문 내용 *</label>
                                                    <textarea
                                                        value={editFormData.question}
                                                        onChange={(e) => setEditFormData({...editFormData, question: e.target.value})}
                                                        placeholder="질문 내용을 입력해주세요."
                                                        required
                                                        maxLength={2000}
                                                        rows={5}
                                                    />
                                                </div>
                                                {qa.isPrivate && (
                                                    <div className="form-group">
                                                        <label>비밀번호 *</label>
                                                        <input
                                                            type="password"
                                                            value={editFormData.password}
                                                            onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                                                            placeholder="비밀번호를 입력해주세요"
                                                            required
                                                        />
                                                    </div>
                                                )}
                                                <div className="qa-edit-buttons">
                                                    <button 
                                                        className="qa-submit-btn"
                                                        onClick={handleEditSubmit}
                                                    >
                                                        수정 완료
                                                    </button>
                                                    <button 
                                                        className="qa-cancel-btn"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        취소
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    className="qa-question-header"
                                                    onClick={() => setOpenQaIndex(isOpen ? null : idx)}
                                                >
                                                    <div className="qa-meta">
                                                        <span className="qa-author">{qa.questionerName || '익명'}</span>
                                                        <span className="qa-date">
                                                            {new Date(qa.createdAt).toLocaleDateString('ko-KR')}
                                                        </span>
                                                        {qa.status === 'answered' && (
                                                            <span className="qa-answered-badge">답변완료</span>
                                                        )}
                                                        {qa.status === 'pending' && (
                                                            <span className="qa-pending-badge">답변대기</span>
                                                        )}
                                                    </div>
                                                    <div className="qa-question-preview">
                                                        {qa.isPrivate && (!qa.question || qa.question === '') 
                                                            ? <span className="qa-question-title">비밀 게시글입니다 🔒</span>
                                                            : <span className="qa-question-title">{qa.title}</span>
                                                        }
                                                    </div>
                                                    <span className="qa-toggle-icon">{isOpen ? '×' : '+'}</span>
                                                </button>

                                                {isOpen && (
                                                    <div className="qa-content-body">
                                                        {qa.isPrivate && (!qa.question || qa.question === '') ? (
                                                            <div className="qa-private-content">
                                                                <p className="qa-locked-text">🔒 비밀 게시글입니다. 비밀번호를 입력하여 확인하세요.</p>
                                                                <button 
                                                                    className="qa-password-btn"
                                                                    onClick={() => handleViewPrivatePost(qa)}
                                                                >
                                                                    비밀번호 입력
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="qa-question-full">
                                                                    <p className="qa-question-text">{qa.question}</p>
                                                                    <button 
                                                                        className="qa-edit-btn"
                                                                        onClick={() => handleEditPost(qa)}
                                                                    >
                                                                        수정
                                                                    </button>
                                                                </div>
                                                                {qa.answer && (
                                                                    <div className="qa-answer">
                                                                        <div className="qa-answer-meta">
                                                                            <span className="qa-answer-label">답변</span>
                                                                            <span className="qa-answer-date">
                                                                                {new Date(qa.answeredAt).toLocaleDateString('ko-KR')}
                                                                            </span>
                                                                        </div>
                                                                        <p className="qa-answer-text">{qa.answer}</p>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="qa-pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="qa-page-btn"
                            >
                                이전
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`qa-page-btn ${currentPage === page ? 'active' : ''}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="qa-page-btn"
                            >
                                다음
                            </button>
                        </div>
                    )}
                </section>

                {showPasswordModal && (
                    <div className="qa-password-modal-overlay" onClick={() => setShowPasswordModal(false)}>
                        <div className="qa-password-modal" onClick={(e) => e.stopPropagation()}>
                            <h3>비밀번호 확인</h3>
                            <p>비밀글을 확인하기 위해 비밀번호를 입력해주세요.</p>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="비밀번호"
                                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                            />
                            <div className="qa-password-modal-buttons">
                                <button 
                                    className="qa-submit-btn"
                                    onClick={handlePasswordSubmit}
                                >
                                    확인
                                </button>
                                <button 
                                    className="qa-cancel-btn"
                                    onClick={() => setShowPasswordModal(false)}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <section className="qa-cta-section">
                    <h2>더 자세한 상담이 필요하신가요?</h2>
                    <p>
                        무료 상담을 통해 맞춤형 마케팅 전략을 제안받으세요.<br />
                        대표 전화 <strong>1600-5678</strong>로 연락 주시거나 아래 버튼을 클릭하세요.
                    </p>
                    <Link to="/support/consult" className="qa-cta-btn">
                        무료 상담 신청하기
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default QaView;
