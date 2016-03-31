// Use showJsError bower component if exists.
if (typeof showJSError !== 'undefined') {
  showJSError.init({
    title: 'JavaScript error',
    userAgent: navigator.userAgent,
    sendText: 'Send',
    sendUrl: 'https://github.com/repoName/issues/new?title={title}&body={body}'
  });
}
