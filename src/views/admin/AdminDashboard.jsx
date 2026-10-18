import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('consultations');
    const [consultations, setConsultations] = useState([]);
    const [qaList, setQaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answerForm, setAnswerForm] = useState({});
    const [submittingAnswer, setSubmittingAnswer] = useState({});
    const [editingAnswer, setEditingAnswer] = useState(null);
    const [editAnswerForm, setEditAnswerForm] = useState({});
    const [submittingEditAnswer, setSubmittingEditAnswer] = useState({});
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [showConsultModal, setShowConsultModal] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);
    const navigate = useNavigate();

    const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:5001';
    const token = localStorage.getItem('adminToken');

    const fetchConsultations = useCallback(async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        try {
            const response = await fetch(`${API_URL}/api/support/consult`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const data = await response.json();
            if (data.success) {
                setConsultations(data.data);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('상담 목록 조회 타임아웃:', error);
                alert('요청 시간이 초과되었습니다. 다시 시도해 주세요.');
            } else {
                console.error('상담 목록 조회 에러:', error);
            }
        }
    }, [API_URL, token]);

    const fetchQaList = useCallback(async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
            
            const response = await fetch(`${API_URL}/api/support/qa?status=all`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            const data = await response.json();
            if (data.success) {
                setQaList(data.data);
            } else {
                console.error('Q&A 목록 조회 실패:', data.message);
                alert('Q&A 목록을 불러오지 못했습니다: ' + data.message);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Q&A 목록 조회 타임아웃:', error);
                alert('요청 시간이 초과되었습니다. 다시 시도해 주세요.');
            } else {
                console.error('Q&A 목록 조회 에러:', error);
                alert('Q&A 목록을 불러오지 못했습니다.');
            }
        }
    }, [API_URL, token]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (activeTab === 'consultations') {
                await fetchConsultations();
            } else {
                await fetchQaList();
            }
        } catch (error) {
            console.error('데이터 조회 에러:', error);
        } finally {
            setLoading(false);
        }
    }, [activeTab, fetchConsultations, fetchQaList]);

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchData();
    }, [token, navigate, fetchData]);

    const fetchConsultationDetail = async (consultId) => {
        try {
            const response = await fetch(`${API_URL}/api/support/consult/${consultId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setSelectedConsultation(data.data);
                setShowConsultModal(true);
            } else {
                alert(data.message || '상담 내역을 불러오지 못했습니다.');
            }
        } catch (error) {
            console.error('상담 상세 조회 에러:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    const handleConsultRowClick = (consultId) => {
        fetchConsultationDetail(consultId);
    };

    const closeConsultModal = () => {
        setShowConsultModal(false);
        setSelectedConsultation(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        navigate('/admin/login');
    };

    const handleAnswerSubmit = async (qaId) => {
        const answer = answerForm[qaId];
        if (!answer || answer.trim().length === 0) {
            alert('답변 내용을 입력해주세요.');
            return;
        }

        setSubmittingAnswer(prev => ({ ...prev, [qaId]: true }));

        try {
            const response = await fetch(`${API_URL}/api/support/qa/${qaId}/answer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ answer })
            });

            const data = await response.json();

            if (data.success) {
                alert('답변이 등록되었습니다.');
                setAnswerForm(prev => ({ ...prev, [qaId]: '' }));
                // 로컬 상태 업데이트 (서버 재요청 없이)
                setQaList(prevQaList => 
                    prevQaList.map(qa => 
                        qa._id === qaId 
                            ? { ...qa, answer: answer.trim(), status: 'answered', answeredAt: new Date(), answeredBy: '관리자' }
                            : qa
                    )
                );
            } else {
                alert(data.message || '답변 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('답변 등록 에러:', error);
            alert('서버 오류가 발생했습니다.');
        } finally {
            setSubmittingAnswer(prev => ({ ...prev, [qaId]: false }));
        }
    };

    const handleEditAnswer = (qa) => {
        setEditingAnswer(qa._id);
        setEditAnswerForm(prev => ({ ...prev, [qa._id]: qa.answer }));
    };

    const handleEditAnswerSubmit = async (qaId) => {
        const answer = editAnswerForm[qaId];
        if (!answer || answer.trim().length === 0) {
            alert('답변 내용을 입력해주세요.');
            return;
        }

        setSubmittingEditAnswer(prev => ({ ...prev, [qaId]: true }));

        try {
            const response = await fetch(`${API_URL}/api/support/qa/${qaId}/answer/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ answer })
            });

            const data = await response.json();

            if (data.success) {
                alert('답변이 수정되었습니다.');
                setEditingAnswer(null);
                setEditAnswerForm(prev => ({ ...prev, [qaId]: '' }));
                // 로컬 상태 업데이트
                setQaList(prevQaList => 
                    prevQaList.map(qa => 
                        qa._id === qaId 
                            ? { ...qa, answer: answer.trim(), answeredAt: new Date(), answeredBy: '관리자' }
                            : qa
                    )
                );
            } else {
                alert(data.message || '답변 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('답변 수정 에러:', error);
            alert('서버 오류가 발생했습니다.');
        } finally {
            setSubmittingEditAnswer(prev => ({ ...prev, [qaId]: false }));
        }
    };

    const handleCancelEditAnswer = (qaId) => {
        setEditingAnswer(null);
        setEditAnswerForm(prev => ({ ...prev, [qaId]: '' }));
    };

    const handleDeleteQa = async (qaId) => {
        if (!window.confirm('이 Q&A를 삭제하시겠습니까?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/support/qa/${qaId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                alert('Q&A가 삭제되었습니다.');
                await fetchQaList();
            } else {
                alert(data.message || '삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('삭제 에러:', error);
            alert('서버 오류가 발생했습니다.');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ko-KR');
    };

    const isImageFile = (fileName) => {
        if (!fileName) return false;
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
        const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
        return imageExtensions.includes(ext);
    };

    const handleImageError = (e) => {
        e.target.style.display = 'none';
        const errorMsg = e.target.parentElement.querySelector('.file-error-message');
        if (errorMsg) {
            errorMsg.style.display = 'block';
        }
    };

    const handleImageZoom = (imageUrl) => {
        setZoomedImage(imageUrl);
    };

    const closeZoomModal = () => {
        setZoomedImage(null);
    };

    return (
        <div className="admin-dashboard-page">
            <div className="admin-dashboard-content">
                <div className="admin-dashboard-header">
                    <h1 className="admin-dashboard-title">관리자 대시보드</h1>
                    <div className="admin-dashboard-nav">
                        <button
                            className={`admin-dashboard-nav-btn ${activeTab === 'consultations' ? 'active' : ''}`}
                            onClick={() => setActiveTab('consultations')}
                        >
                            상담 신청
                        </button>
                        <button
                            className={`admin-dashboard-nav-btn ${activeTab === 'qa' ? 'active' : ''}`}
                            onClick={() => setActiveTab('qa')}
                        >
                            Q&A
                        </button>
                        <button
                            className="admin-dashboard-logout-btn"
                            onClick={handleLogout}
                        >
                            로그아웃
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="admin-dashboard-empty">로딩 중...</div>
                ) : activeTab === 'consultations' ? (
                    <div className="admin-dashboard-section">
                        <h2 className="admin-dashboard-section-title">상담 신청 내역</h2>
                        {consultations.length === 0 ? (
                            <div className="admin-dashboard-empty">상담 신청 내역이 없습니다.</div>
                        ) : (
                            <table className="admin-dashboard-table">
                                <thead>
                                    <tr>
                                        <th>회사명</th>
                                        <th>이름</th>
                                        <th>연락처</th>
                                        <th>이메일</th>
                                        <th>카테고리</th>
                                        <th>예산</th>
                                        <th>신청일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consultations.map((consult) => (
                                        <tr 
                                            key={consult._id} 
                                            onClick={() => handleConsultRowClick(consult._id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <td>{consult.company}</td>
                                            <td>{consult.name}</td>
                                            <td>{consult.phone}</td>
                                            <td>{consult.email}</td>
                                            <td>{consult.categories?.join(', ') || '-'}</td>
                                            <td>{consult.budget || '-'}</td>
                                            <td>{formatDate(consult.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ) : (
                    <div className="admin-dashboard-section">
                        <h2 className="admin-dashboard-section-title">Q&A 관리</h2>
                        {qaList.length === 0 ? (
                            <div className="admin-dashboard-empty">Q&A가 없습니다.</div>
                        ) : (
                            <div className="qa-admin-list">
                                {qaList.map((qa) => (
                                    <div key={qa._id} className="qa-admin-item">
                                        <div className="qa-admin-header">
                                            <div className="qa-admin-meta">
                                                <span className="qa-admin-author">{qa.questionerName || '익명'}</span>
                                                <span className="qa-admin-date">{formatDate(qa.createdAt)}</span>
                                                <span className={`admin-dashboard-status ${qa.status}`}>
                                                    {qa.status === 'pending' ? '대기중' : '답변완료'}
                                                </span>
                                            </div>
                                            <div className="qa-admin-actions">
                                                <button
                                                    className="admin-dashboard-action-btn"
                                                    onClick={() => handleDeleteQa(qa._id)}
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        </div>
                                        <div className="qa-admin-question">
                                            <strong>질문:</strong> {qa.question}
                                        </div>
                                        {qa.answer ? (
                                            <div className="qa-admin-answer">
                                                {editingAnswer === qa._id ? (
                                                    <>
                                                        <textarea
                                                            className="admin-dashboard-answer-textarea"
                                                            placeholder="답변 내용을 입력하세요..."
                                                            value={editAnswerForm[qa._id] || ''}
                                                            onChange={(e) => setEditAnswerForm(prev => ({
                                                                ...prev,
                                                                [qa._id]: e.target.value
                                                            }))}
                                                        />
                                                        <div className="qa-admin-answer-edit-buttons">
                                                            <button
                                                                className="admin-dashboard-answer-submit"
                                                                onClick={() => handleEditAnswerSubmit(qa._id)}
                                                                disabled={submittingEditAnswer[qa._id]}
                                                            >
                                                                {submittingEditAnswer[qa._id] ? '수정 중...' : '수정 완료'}
                                                            </button>
                                                            <button
                                                                className="admin-dashboard-action-btn"
                                                                onClick={() => handleCancelEditAnswer(qa._id)}
                                                            >
                                                                취소
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <strong>답변:</strong> {qa.answer}
                                                        <div className="qa-admin-answer-meta">
                                                            <span>답변자: {qa.answeredBy}</span>
                                                            <span>{formatDate(qa.answeredAt)}</span>
                                                            <button
                                                                className="admin-dashboard-action-btn"
                                                                onClick={() => handleEditAnswer(qa)}
                                                            >
                                                                수정
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="admin-dashboard-answer-form">
                                                <textarea
                                                    className="admin-dashboard-answer-textarea"
                                                    placeholder="답변 내용을 입력하세요..."
                                                    value={answerForm[qa._id] || ''}
                                                    onChange={(e) => setAnswerForm(prev => ({
                                                        ...prev,
                                                        [qa._id]: e.target.value
                                                    }))}
                                                />
                                                <button
                                                    className="admin-dashboard-answer-submit"
                                                    onClick={() => handleAnswerSubmit(qa._id)}
                                                    disabled={submittingAnswer[qa._id]}
                                                >
                                                    {submittingAnswer[qa._id] ? '등록 중...' : '답변 등록'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showConsultModal && selectedConsultation && (
                <div className="admin-modal-overlay" onClick={closeConsultModal}>
                    <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h2 className="admin-modal-title">상담 신청 상세</h2>
                            <button className="admin-modal-close" onClick={closeConsultModal}>×</button>
                        </div>
                        <div className="admin-modal-body">
                            <div className="admin-modal-section">
                                <h3>기본 정보</h3>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">회사명:</span>
                                    <span className="admin-modal-value">{selectedConsultation.company}</span>
                                </div>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">이름:</span>
                                    <span className="admin-modal-value">{selectedConsultation.name}</span>
                                </div>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">직책:</span>
                                    <span className="admin-modal-value">{selectedConsultation.role || '-'}</span>
                                </div>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">연락처:</span>
                                    <span className="admin-modal-value">{selectedConsultation.phone}</span>
                                </div>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">이메일:</span>
                                    <span className="admin-modal-value">{selectedConsultation.email}</span>
                                </div>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">웹사이트:</span>
                                    <span className="admin-modal-value">{selectedConsultation.website || '-'}</span>
                                </div>
                            </div>

                            <div className="admin-modal-section">
                                <h3>상담 정보</h3>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">카테고리:</span>
                                    <span className="admin-modal-value">{selectedConsultation.categories?.join(', ') || '-'}</span>
                                </div>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">예산:</span>
                                    <span className="admin-modal-value">{selectedConsultation.budget || '-'}</span>
                                </div>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">희망 연락 시간:</span>
                                    <span className="admin-modal-value">{selectedConsultation.preferredTime || '-'}</span>
                                </div>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">메시지:</span>
                                    <span className="admin-modal-value">{selectedConsultation.message || '-'}</span>
                                </div>
                            </div>

                            {selectedConsultation.fileName && (
                                <div className="admin-modal-section">
                                    <h3>첨부파일</h3>
                                    <div className="admin-modal-row">
                                        <span className="admin-modal-label">파일명:</span>
                                        <span className="admin-modal-value">{selectedConsultation.fileName}</span>
                                    </div>
                                    <div className="admin-modal-row">
                                        <span className="admin-modal-label">파일 크기:</span>
                                        <span className="admin-modal-value">
                                            {selectedConsultation.fileSize 
                                                ? `${(selectedConsultation.fileSize / 1024).toFixed(2)} KB` 
                                                : '-'}
                                        </span>
                                    </div>
                                    <div className="admin-modal-row">
                                        <span className="admin-modal-label">파일:</span>
                                        <div className="admin-modal-file">
                                            {isImageFile(selectedConsultation.fileName) ? (
                                                <div className="admin-modal-image-preview">
                                                    <img 
                                                        src={`${API_URL}/api/support/consult/file/${selectedConsultation.fileName}`} 
                                                        alt="첨부파일 미리보기"
                                                        onError={handleImageError}
                                                        onClick={() => handleImageZoom(`${API_URL}/api/support/consult/file/${selectedConsultation.fileName}`)}
                                                        style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', cursor: 'pointer' }}
                                                    />
                                                    <p className="file-error-message" style={{ display: 'none', color: '#dc3545', marginTop: '10px' }}>
                                                        파일을 찾을 수 없습니다. 파일이 서버에 존재하지 않거나 삭제되었습니다.
                                                    </p>
                                                    <button 
                                                        className="admin-modal-download-btn"
                                                        onClick={() => window.open(`${API_URL}/api/support/consult/file/${selectedConsultation.fileName}`, '_blank')}
                                                    >
                                                        원본 보기
                                                    </button>
                                                </div>
                                            ) : (
                                                <button 
                                                    className="admin-modal-download-btn"
                                                    onClick={() => window.open(`${API_URL}/api/support/consult/file/${selectedConsultation.fileName}`, '_blank')}
                                                >
                                                    다운로드
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="admin-modal-section">
                                <h3>기타 정보</h3>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">신청일:</span>
                                    <span className="admin-modal-value">{formatDate(selectedConsultation.createdAt)}</span>
                                </div>
                                <div className="admin-modal-row">
                                    <span className="admin-modal-label">IP 주소:</span>
                                    <span className="admin-modal-value">{selectedConsultation.ipAddress || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {zoomedImage && (
                <div className="image-zoom-overlay" onClick={closeZoomModal}>
                    <div className="image-zoom-content" onClick={(e) => e.stopPropagation()}>
                        <button className="image-zoom-close" onClick={closeZoomModal}>×</button>
                        <img 
                            src={zoomedImage} 
                            alt="확대된 이미지"
                            className="zoomed-image"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
