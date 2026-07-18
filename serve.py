#!/usr/bin/env python3
"""Dev server with Vercel-style clean URLs: /work -> work.html"""
import http.server
import os
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4526
ROOT = os.path.dirname(os.path.abspath(__file__))


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        path = self.path.split('?')[0].split('#')[0]
        trimmed = path.rstrip('/')
        if trimmed and '.' not in os.path.basename(trimmed):
            candidate = os.path.join(ROOT, trimmed.lstrip('/') + '.html')
            if os.path.isfile(candidate):
                self.path = trimmed + '.html'
        return super().do_GET()


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('', PORT), CleanURLHandler) as httpd:
    print(f'serving {ROOT} on http://localhost:{PORT}')
    httpd.serve_forever()
