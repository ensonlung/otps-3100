import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import AdminLeftPanel from "./AdminPanel/AdminLeftPanel";
import AdminPost, { AdminPostProps } from "./AdminPanel/AdminPost";
import AdminComment from "./AdminPanel/AdminComment";
import { useLocation } from "react-router-dom"
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AdminFeedbackProps } from "./AdminPanel/AdminComment";

const AdminCommentWrapper: React.FC<{
    feedback: AdminFeedbackProps;
    index: number;
    onFeedbackChange: () => void;
  }> = ({ feedback, index, onFeedbackChange }) => {
    return <>{AdminComment(feedback, onFeedbackChange)}</>;
};

const AdminPostWrapper: React.FC<{
    post: AdminPostProps;
    index: number;
    onPostChange: () => void;
  }> = ({ post, index, onPostChange }) => {
    return <>{AdminPost(post, onPostChange)}</>;
};

function AdminPage() {
    const location = useLocation();
    const {username, password} = location.state || {};

    const [reportedPosts, setReportedPosts] = useState<AdminPostProps[]>([]);
    const [reportedFeedbacks, setReportedFeedbacks] = useState<AdminFeedbackProps[]>([]);
    
    const fetchInitialReportedPosts = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/get-report-post', {});
          const rawPosts: any[] = response.data.posts;
    
          const formattedPosts: AdminPostProps[] = rawPosts.map((post: any) => ({
            id: post.reportDetails.reportId,
            username: post.postCon.username || 'Unknown',
            subject: post.postCon.subject || [],
            district: post.postCon.district || [],
            tuitionFee: post.postCon.fee || 'Not specified',
            availableDays: post.postCon.day || [],
            contact: post.postCon.contact || 'Not Spec',
            reportReason: post.reportDetails.reportReason || '',
            specificReason: post.reportDetails.reportSpecialReason || '',
          }));
          setReportedPosts(formattedPosts);
        } catch (error) {
          console.error('Error fetching initial posts:', error);
          setReportedPosts([]);
        }
      };
    
      // Function to fetch reported feedbacks
      const fetchInitialReportedFeedbacks = useCallback(async () => {
        console.log("fetch");
        try {
          const response = await axios.post('http://localhost:3000/api/get-report-feedback', {});
          const rawFeedbacks: any[] = response.data.feedbacks;
    
          const formattedFeedbacks: AdminFeedbackProps[] = rawFeedbacks.map((feedback: any) => ({
            commentor: feedback.feedbackCon.commentor,
            tutor: feedback.feedbackCon.tutorName,
            id: feedback.reportDetails.reportId,
            comment: feedback.feedbackCon.comment || '',
            rating: feedback.feedbackCon.rating || '',
            reportReason: feedback.reportDetails.reportReason || '',
            specificReason: feedback.reportDetails.reportSpecialReason || '',
          }));
          console.log(formattedFeedbacks);

          setReportedFeedbacks(formattedFeedbacks);
        } catch (error) {
          console.error('Error fetching initial feedbacks:', error);
          setReportedFeedbacks([]);
        }
      }, []);
    
      // Fetch reported posts and feedbacks on mount
      useEffect(() => {
        fetchInitialReportedPosts();
        fetchInitialReportedFeedbacks();
      }, [fetchInitialReportedFeedbacks]);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="bg-light" md="2">
                        <AdminLeftPanel username={username}/>
                    </Col>
                    <Col md="6">
                        <h3>Post Reports</h3>
                        {reportedPosts.length > 0 ? (
                        <ul>
                            {reportedPosts.map((post, index) => 
                            <AdminPostWrapper 
                            key={index} 
                            post={post} 
                            index={index}
                            onPostChange={fetchInitialReportedPosts}/>)}
                        </ul>
                        ) : (
                            <p>No feedback posts found.</p>                        
                        )}
                    </Col>
                    <Col className="bg-light" md="4">
                        <h3>Feedback Reports</h3>
                        {reportedFeedbacks.length > 0 ? (
                        <ul>
                            {reportedFeedbacks.map((feedback, index) => 
                            <AdminCommentWrapper
                            key={index}
                            feedback={feedback}
                            index={index}
                            onFeedbackChange={fetchInitialReportedFeedbacks}/>)}
                        </ul>
                        ) : (
                            <p>No feedback reports found.</p>                        
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AdminPage;