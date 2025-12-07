/**
 * MarkdownRenderer - Renders markdown content with code blocks
 * Matches the old implementation's markdown styling
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy } from 'lucide-react';

// Type helpers for react-markdown components
interface CodeProps extends React.ComponentProps<'code'> {
  className?: string;
  children?: React.ReactNode;
}

interface OlProps extends React.ComponentProps<'ol'> {
  children?: React.ReactNode;
  start?: number;
}

interface LiProps extends React.ComponentProps<'li'> {
  children?: React.ReactNode;
}

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  // Don't escape list markers - let markdown handle them naturally
  // The issue was we were trying to prevent markdown from parsing lists
  // but we actually want proper list rendering with the numbers visible

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml={false}
        components={{
          code({ className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');
            const isInline = !className || !language;

            if (!isInline) {
              return (
                <div className="my-2">
                  <div className="bg-slate-800 border-slate-200 text-gray-200 rounded-t-lg px-3 py-2 flex items-center justify-between">
                    <span className="text-xs font-mono font-medium">{language || 'code'}</span>
                    <button
                      onClick={() => copyToClipboard(codeString)}
                      className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors flex items-center gap-1"
                    >
                      <Copy size={12} />
                      Copy
                    </button>
                  </div>
                  <div className="bg-slate-900 rounded-b-lg p-3 overflow-x-auto">
                    <pre className="p-2 bg-slate-800 text-gray-300 text-sm font-mono rounded-b-lg leading-snug m-0 border-0">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                </div>
              );
            }

            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="whitespace-pre-wrap leading-relaxed mb-4 last:mb-0">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
          },
          ol({ children, start }: OlProps) {
            // Preserve the start attribute from markdown
            const startNum = start || 1;
            return (
              <ol
                start={startNum}
                className="list-decimal mb-4 space-y-2 ml-6"
              >
                {children}
              </ol>
            );
          },
          li({ children }: LiProps) {
            return <li className="leading-relaxed pl-2">{children}</li>;
          },
          h1({ children }) {
            return <h1 className="text-2xl font-bold mb-3 mt-6 first:mt-0">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-bold mb-2 mt-5 first:mt-0">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-semibold mb-2 mt-4 first:mt-0">{children}</h3>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-muted pl-4 italic my-4 text-muted-foreground">
                {children}
              </blockquote>
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
