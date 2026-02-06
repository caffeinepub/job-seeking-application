import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Minimize2, Send, Briefcase, FileText, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { UserRole } from '../backend';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  quickActions?: QuickAction[];
}

interface QuickAction {
  label: string;
  action: string;
  icon?: React.ReactNode;
}

interface ConversationFlow {
  trigger: string;
  response: string;
  quickActions?: QuickAction[];
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: userProfile } = useGetCallerUserProfile();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when chat opens for the first time
      setTimeout(() => {
        addAssistantMessage(getWelcomeMessage());
      }, 500);
    }
  }, [isOpen]);

  const getWelcomeMessage = (): string => {
    if (!userProfile) return "Hello! How can I assist you today?";
    
    if (userProfile.role === UserRole.candidate) {
      return "Hi! I'm your AI Career Assistant. I can help you with job searches, resume improvements, interview preparation, and finding matching opportunities. How can I help you today?";
    } else {
      return "Hi! I'm your AI Hiring Assistant. I can help you create job postings, schedule interviews, find qualified candidates, and optimize your hiring process. What would you like to do?";
    }
  };

  const getCandidateQuickActions = (): QuickAction[] => [
    { label: 'Improve Resume', action: 'improve-resume', icon: <FileText className="h-4 w-4" /> },
    { label: 'Prepare for Interview', action: 'prepare-interview', icon: <Calendar className="h-4 w-4" /> },
    { label: 'Find Jobs', action: 'find-jobs', icon: <Briefcase className="h-4 w-4" /> },
    { label: 'Career Tips', action: 'career-tips', icon: <Users className="h-4 w-4" /> },
  ];

  const getEmployerQuickActions = (): QuickAction[] => [
    { label: 'Create Job', action: 'create-job', icon: <Briefcase className="h-4 w-4" /> },
    { label: 'Find Candidates', action: 'find-candidates', icon: <Users className="h-4 w-4" /> },
    { label: 'Schedule Interview', action: 'schedule-interview', icon: <Calendar className="h-4 w-4" /> },
    { label: 'Hiring Tips', action: 'hiring-tips', icon: <FileText className="h-4 w-4" /> },
  ];

  const candidateConversations: ConversationFlow[] = [
    {
      trigger: 'improve-resume',
      response: "Great! Here are some tips to improve your resume:\n\n1. **Highlight Key Skills**: Make sure your most relevant skills are prominently displayed at the top.\n2. **Quantify Achievements**: Use numbers and metrics to demonstrate your impact (e.g., 'Increased sales by 30%').\n3. **Tailor to Job**: Customize your resume for each application to match job requirements.\n4. **Keep it Concise**: Aim for 1-2 pages with clear, scannable sections.\n5. **Use Action Verbs**: Start bullet points with strong verbs like 'Led', 'Developed', 'Achieved'.\n\nWould you like to upload your resume for AI-powered analysis?",
      quickActions: [
        { label: 'Upload Resume', action: 'upload-resume' },
        { label: 'View Analysis', action: 'view-analysis' },
      ],
    },
    {
      trigger: 'prepare-interview',
      response: "Let me help you prepare for your interview! Here are some common interview questions and tips:\n\n**Common Questions:**\n1. Tell me about yourself\n2. What are your strengths and weaknesses?\n3. Why do you want this position?\n4. Where do you see yourself in 5 years?\n\n**Tips:**\n- Research the company thoroughly\n- Prepare specific examples using the STAR method\n- Dress professionally\n- Arrive 10-15 minutes early\n- Prepare questions to ask the interviewer\n\nWould you like more specific guidance?",
      quickActions: [
        { label: 'Practice Questions', action: 'practice-questions' },
        { label: 'View Interviews', action: 'view-interviews' },
      ],
    },
    {
      trigger: 'find-jobs',
      response: "I can help you find the perfect job! Here's what I recommend:\n\n1. **Browse Job Listings**: Check out all available positions that match your skills\n2. **View Recommendations**: See jobs specifically matched to your profile\n3. **Set Preferences**: Update your desired salary and location\n4. **Apply Strategically**: Focus on positions that align with your experience\n\nWould you like to see your recommended jobs now?",
      quickActions: [
        { label: 'Browse Jobs', action: 'browse-jobs' },
        { label: 'View Recommendations', action: 'view-recommendations' },
      ],
    },
    {
      trigger: 'career-tips',
      response: "Here are some valuable career development tips:\n\n**Skill Development:**\n- Take online courses to learn new technologies\n- Earn certifications in your field\n- Attend industry conferences and webinars\n\n**Networking:**\n- Connect with professionals on LinkedIn\n- Join industry-specific groups\n- Attend local meetups and events\n\n**Job Search Strategy:**\n- Apply to 5-10 positions per week\n- Follow up on applications after 1 week\n- Customize each application\n\nWhat specific area would you like to focus on?",
    },
    {
      trigger: 'upload-resume',
      response: "To upload your resume, go to the 'My Profile' tab in your dashboard. You can upload PDF, DOCX, or image files. Once uploaded, our AI will automatically analyze it and provide personalized recommendations!",
    },
    {
      trigger: 'view-analysis',
      response: "You can view your resume analysis in the 'Resume Analysis' tab of your dashboard. There you'll find your resume score, identified skills, and personalized improvement suggestions.",
    },
    {
      trigger: 'practice-questions',
      response: "Here are some practice questions to help you prepare:\n\n1. **Behavioral**: 'Tell me about a time you faced a challenge at work and how you overcame it.'\n2. **Technical**: 'Explain your approach to problem-solving in your field.'\n3. **Situational**: 'How would you handle a disagreement with a team member?'\n\nPractice your answers using the STAR method (Situation, Task, Action, Result).",
    },
    {
      trigger: 'view-interviews',
      response: "You can view all your scheduled interviews in the 'Interviews' tab of your dashboard. There you'll find meeting links, dates, and interview details.",
    },
    {
      trigger: 'browse-jobs',
      response: "Head to the 'Job Search' tab to browse all available positions. You can filter by salary range, location, and job title to find the perfect match!",
    },
    {
      trigger: 'view-recommendations',
      response: "Check out the 'Recommendations' section in your Job Search tab to see jobs that match your skills and experience. These are personalized based on your profile!",
    },
  ];

  const employerConversations: ConversationFlow[] = [
    {
      trigger: 'create-job',
      response: "Let me guide you through creating an effective job posting:\n\n**Key Elements:**\n1. **Clear Job Title**: Use standard industry titles\n2. **Detailed Description**: Explain role responsibilities and expectations\n3. **Required Skills**: List must-have qualifications\n4. **Salary Range**: Be transparent about compensation\n5. **Location**: Specify if remote, hybrid, or on-site\n\n**Tips:**\n- Be specific about requirements\n- Highlight company culture and benefits\n- Use inclusive language\n\nReady to create your job posting?",
      quickActions: [
        { label: 'Create Job Now', action: 'create-job-now' },
        { label: 'View My Jobs', action: 'view-jobs' },
      ],
    },
    {
      trigger: 'find-candidates',
      response: "I can help you find the perfect candidates! Here's how:\n\n**Search Strategies:**\n1. **Browse Profiles**: View all candidate profiles with skills and experience\n2. **View Recommendations**: See candidates matched to your job postings\n3. **Filter by Skills**: Search for specific technical skills\n4. **Location Match**: Find candidates in your preferred location\n\n**Evaluation Tips:**\n- Review resume analysis scores\n- Check gamification badges (shows engagement)\n- Look at skill test results\n\nWould you like to start searching?",
      quickActions: [
        { label: 'Browse Candidates', action: 'browse-candidates' },
        { label: 'View Recommendations', action: 'view-candidate-recommendations' },
      ],
    },
    {
      trigger: 'schedule-interview',
      response: "Here's how to schedule an effective interview:\n\n**Steps:**\n1. Go to the 'Applications' tab\n2. Select a candidate's application\n3. Click 'Schedule Interview'\n4. Set date, time, and meeting link\n5. Add notes about interview focus\n\n**Best Practices:**\n- Give candidates 2-3 day notice\n- Use video conferencing for remote interviews\n- Prepare structured questions\n- Allow time for candidate questions\n\nReady to schedule an interview?",
      quickActions: [
        { label: 'View Applications', action: 'view-applications' },
        { label: 'View Interviews', action: 'view-employer-interviews' },
      ],
    },
    {
      trigger: 'hiring-tips',
      response: "Here are proven hiring best practices:\n\n**Screening:**\n- Review resume analysis scores\n- Check skill assessment results\n- Look for relevant experience\n\n**Interviewing:**\n- Use structured interview questions\n- Assess both technical and soft skills\n- Take detailed notes\n\n**Decision Making:**\n- Compare candidates objectively\n- Check references\n- Consider cultural fit\n- Provide timely feedback\n\nWhat aspect of hiring would you like to explore?",
    },
    {
      trigger: 'create-job-now',
      response: "Navigate to the 'Job Listings' tab in your dashboard and click 'Create New Job' to get started. Fill in all the details and your job will be posted immediately!",
    },
    {
      trigger: 'view-jobs',
      response: "You can view and manage all your job postings in the 'Job Listings' tab of your dashboard. There you can edit, update, or close positions.",
    },
    {
      trigger: 'browse-candidates',
      response: "Head to the 'Candidates' tab to browse all candidate profiles. You can view their skills, experience, resume analysis scores, and download their resumes.",
    },
    {
      trigger: 'view-candidate-recommendations',
      response: "Check the 'Recommendations' section in your Candidates tab to see candidates that match your job requirements. These are ranked by compatibility!",
    },
    {
      trigger: 'view-applications',
      response: "Go to the 'Applications' tab to see all candidates who have applied to your job postings. You can review their profiles and schedule interviews from there.",
    },
    {
      trigger: 'view-employer-interviews',
      response: "Visit the 'Interviews' tab to see all your scheduled interviews. You can update meeting details, change status, and submit feedback after interviews.",
    },
  ];

  const getConversationFlow = (): ConversationFlow[] => {
    if (!userProfile) return [];
    return userProfile.role === UserRole.candidate ? candidateConversations : employerConversations;
  };

  const getQuickActions = (): QuickAction[] => {
    if (!userProfile) return [];
    return userProfile.role === UserRole.candidate ? getCandidateQuickActions() : getEmployerQuickActions();
  };

  const addAssistantMessage = (content: string, quickActions?: QuickAction[]) => {
    const newMessage: Message = {
      id: Date.now(),
      content,
      sender: 'assistant',
      timestamp: new Date(),
      quickActions,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      setIsTyping(false);
      processUserMessage(inputValue.toLowerCase());
    }, 1000);
  };

  const processUserMessage = (message: string) => {
    const conversationFlow = getConversationFlow();
    
    // Check for keyword matches
    let response = "I understand you're asking about that. ";
    let matchedFlow: ConversationFlow | undefined;

    if (message.includes('resume') || message.includes('cv')) {
      matchedFlow = conversationFlow.find((f) => f.trigger === 'improve-resume');
    } else if (message.includes('interview')) {
      matchedFlow = conversationFlow.find((f) => f.trigger === 'prepare-interview');
    } else if (message.includes('job') && userProfile?.role === UserRole.candidate) {
      matchedFlow = conversationFlow.find((f) => f.trigger === 'find-jobs');
    } else if (message.includes('candidate') && userProfile?.role === UserRole.employer) {
      matchedFlow = conversationFlow.find((f) => f.trigger === 'find-candidates');
    } else if (message.includes('post') || message.includes('create')) {
      matchedFlow = conversationFlow.find((f) => f.trigger === 'create-job');
    } else if (message.includes('tip') || message.includes('advice') || message.includes('help')) {
      matchedFlow = conversationFlow.find((f) => 
        f.trigger === (userProfile?.role === UserRole.candidate ? 'career-tips' : 'hiring-tips')
      );
    }

    if (matchedFlow) {
      addAssistantMessage(matchedFlow.response, matchedFlow.quickActions);
    } else {
      // Default response with quick actions
      if (userProfile?.role === UserRole.candidate) {
        response += "I can help you with job searches, resume improvements, interview preparation, and career advice. What would you like to explore?";
      } else {
        response += "I can help you create job postings, find candidates, schedule interviews, and optimize your hiring process. What would you like to do?";
      }
      addAssistantMessage(response, getQuickActions());
    }
  };

  const handleQuickAction = (action: string) => {
    addUserMessage(`I'd like to: ${action.replace(/-/g, ' ')}`);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const conversationFlow = getConversationFlow();
      const flow = conversationFlow.find((f) => f.trigger === action);
      
      if (flow) {
        addAssistantMessage(flow.response, flow.quickActions);
      } else {
        addAssistantMessage("Let me help you with that. Please use the navigation tabs in your dashboard to access that feature.");
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-110 flex items-center justify-center"
        aria-label="Open AI Chat Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 z-50 w-96 shadow-2xl transition-all ${
        isMinimized ? 'h-14' : 'h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-primary text-primary-foreground p-4 rounded-t-lg">
        <div className="flex items-center gap-2">
          <img
            src="/assets/generated/ai-chat-icon-transparent.dim_32x32.png"
            alt="AI Assistant"
            className="h-8 w-8"
          />
          <div>
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <p className="text-xs opacity-90">
              {userProfile?.role === UserRole.candidate ? 'Career Helper' : 'Hiring Helper'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Content */}
      {!isMinimized && (
        <>
          <ScrollArea className="h-[calc(600px-140px)] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.quickActions && message.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.quickActions.map((action, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction(action.action)}
                            className="text-xs h-8"
                          >
                            {action.icon && <span className="mr-1">{action.icon}</span>}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
