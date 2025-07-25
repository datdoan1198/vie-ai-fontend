import React from "react";

export const routeMap = [
    {
        label: '',
        menu: true,
        routes: [
            {
                label: 'Tổng quan',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 19.5" width="19.5" height="19.5">
                        <g fill="currentColor">
                            <path className="fa-primary"
                                  d="M8.531 3.047c0 -1.009 -0.819 -1.828 -1.828 -1.828H3.047c-1.009 0 -1.828 0.819 -1.828 1.828v3.656c0 1.009 0.819 1.828 1.828 1.828h3.656c1.009 0 1.828 -0.819 1.828 -1.828V3.047zm9.75 9.75c0 -1.009 -0.819 -1.828 -1.828 -1.828h-3.656c-1.009 0 -1.828 0.819 -1.828 1.828v3.656c0 1.009 0.819 1.828 1.828 1.828h3.656c1.009 0 1.828 -0.819 1.828 -1.828v-3.656z"/>
                        </g>
                        <path className="fa-secondary"
                              fill="currentColor"
                              d="M18.281 2.742c0 -0.842 -0.682 -1.523 -1.523 -1.523H12.492c-0.842 0 -1.523 0.682 -1.523 1.523v4.266c0 0.842 0.682 1.523 1.523 1.523h4.266c0.842 0 1.523 -0.682 1.523 -1.523V2.742zM8.531 12.492c0 -0.842 -0.682 -1.523 -1.523 -1.523H2.742c-0.842 0 -1.523 0.682 -1.523 1.523v4.266c0 0.842 0.682 1.523 1.523 1.523h4.266c0.842 0 1.523 -0.682 1.523 -1.523V12.492z"/>
                    </svg>
                ),
                path: '/',
                routeActive: ['/'],
            },
        ]
    }
]
