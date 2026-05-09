export interface AuthResponse {
    access_token: string;
    token_type: string;
    user_id: number;
    username: string;
    expires_at: number;
}

export interface User {
    id: number;
    username: string;
}

export interface LinterIssue {
    id: number;
    line_number: number;
    message: string;
    tool_name: string | null;
    rule_code: string | null;
    severity: string;
}

export interface LLMSuggestion {
    id: number;
    line_number: number;
    suggestion_type: string;
    text: string;
    severity: string;
}

export interface Review {
    id: number;
    filename: string;
    status: string;
    llm_summary: string;
    linter_issues: LinterIssue[];
    llm_suggestions: LLMSuggestion[];
    created_at: string;
}