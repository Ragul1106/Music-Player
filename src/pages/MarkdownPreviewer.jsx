import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { marked } from 'marked';

const initialMarkdown = `# Welcome to the Markdown Previewer

## Sub-heading
- List item 1
- List item 2
**Bold Text**  
[OpenAI](https://openai.com)
\`\`\`js
console.log('Code block!');
\`\`\`
`;

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container my-5 p-4 bg-white rounded-4 shadow-lg"
    >
      <h2 className="text-center text-primary fw-bold mb-4">📝 Markdown Previewer</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <label className="form-label fw-semibold">✍️ Markdown Input</label>
          <textarea
            className="form-control shadow-sm rounded-4"
            rows="15"
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            style={{ fontFamily: 'monospace' }}
          />
        </div>
        <div className="col-md-6 mb-4">
          <label className="form-label fw-semibold">🔍 Preview</label>
          <div
            className="border p-3 bg-light rounded-4 shadow-sm"
            style={{ minHeight: '100%', overflowY: 'auto' }}
            dangerouslySetInnerHTML={{ __html: marked(markdown, { breaks: true }) }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MarkdownPreviewer;
