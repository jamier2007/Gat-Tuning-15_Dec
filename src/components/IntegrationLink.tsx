import React from 'react';
import { ExternalLink } from 'lucide-react';

interface IntegrationLinkProps {
  href: string;
  children: React.ReactNode;
}

const IntegrationLink: React.FC<IntegrationLinkProps> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
  >
    <span>{children}</span>
    <ExternalLink className="w-3 h-3" />
  </a>
);

export default IntegrationLink;