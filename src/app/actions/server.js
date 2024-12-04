'use server'

import { getCookie, refresh } from '@/app/actions/auth'

export async function get() {

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user-dashboard/' + userId, {
        method: 'GET',
    }).then(res => {
        return res.json();
    })
}