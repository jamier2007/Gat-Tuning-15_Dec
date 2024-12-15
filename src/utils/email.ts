import { ServerClient } from 'postmark';

let client: ServerClient | null = null;

export const initializePostmark = (serverToken: string) => {
  if (!serverToken) {
    throw new Error('Postmark server token is required');
  }
  client = new ServerClient(serverToken);
};

interface Attachment {
  filename: string;
  content: Blob;
  contentType: string;
}

export const sendEmail = async (
  to: string,
  subject: string,
  textBody: string,
  htmlBody: string,
  attachments?: Attachment[]
) => {
  if (!client) {
    throw new Error('Postmark client not initialized');
  }

  try {
    const emailData: any = {
      From: to, // For testing, send to self
      To: to,
      Subject: subject,
      TextBody: textBody,
      HtmlBody: htmlBody,
      MessageStream: 'outbound'
    };

    if (attachments?.length) {
      emailData.Attachments = await Promise.all(
        attachments.map(async (attachment) => {
          const buffer = await attachment.content.arrayBuffer();
          return {
            Name: attachment.filename,
            Content: Buffer.from(buffer).toString('base64'),
            ContentType: attachment.contentType,
          };
        })
      );
    }

    const response = await client.sendEmail(emailData);
    return response.ErrorCode === 0;
  } catch (error) {
    console.error('Postmark Error:', error);
    throw error;
  }
};