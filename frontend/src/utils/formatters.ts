import type { Review } from '../types';

export function formatReviewResult(review: Review): string {
    const lines: string[] = [];

    lines.push(`📅 Создано: ${new Date(review.created_at).toLocaleString()}`);
    lines.push(`📌 Статус: ${review.status}`);
    lines.push('');
    lines.push('=== Общее резюме LLM ===');
    lines.push(review.llm_summary || 'Нет резюме');
    lines.push('');

    if (review.linter_issues.length > 0) {
        lines.push('=== Проблемы линтера ===');
        review.linter_issues.forEach((issue) => {

            lines.push(
                `[${issue.tool_name || 'unknown'}] Строка ${issue.line_number} (${issue.severity}): ${issue.message} (${issue.rule_code || 'N/A'})`            );
        });
        lines.push('');
    }

    if (review.llm_suggestions.length > 0) {
        lines.push('=== Рекомендации LLM ===');
        review.llm_suggestions.forEach((sugg) => {
            lines.push(
                `Строка ${sugg.line_number} [${sugg.severity}] (${sugg.suggestion_type}): ${sugg.text}`
            );
        });
        lines.push('');
    }

    return lines.join('\n');
}