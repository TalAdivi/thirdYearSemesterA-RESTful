/*  globals $ */
{
    const form = $('form')[0]
    const copyBtn = $('#copy-button')

    copyBtn.tooltip()


    copyBtn.bind('click', () => {
        navigator
            .clipboard
            .writeText($('#copy-input').text())
            .then(() => copyBtn.trigger('copied', [ 'Copied!' ]))
            .catch(err => copyBtn.trigger('copied', [ err ]))
    })
    copyBtn.bind('copied', function (event, message) {
        $(this)
            .attr('title', message)
            .tooltip('fixTitle')
            .tooltip('show')
            .attr('title', 'Copy to Clipboard')
            .tooltip('fixTitle')
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const email = $('#email')
        const password = $('#password')

        const cleanForm = (err, message) => {
            if (err) {
                email.val('')
                password.val('')
                $('.modal-header').addClass('bg-danger')
                $('.modal-title').text('ERROR!')
                $('#copy-button').attr('disabled', true)
                $('.modal-body pre').text(message)
            } else {
                email.fadeOut()
                password.fadeOut()
               
                $('.modal-header').removeClass('bg-danger').addClass('bg-success')
                $('.modal-title').text('YOUR TOKEN: ')
                $('#copy-button').attr('disabled', false)
                $('.modal-body pre').css({
                    'overflow-x': 'auto',
                    'white-space': 'nowrap',
                }).text(message)
            }


            $('#modalBox').modal()
        }
        console.log(window.root_url)
        fetch(`${window.root_url}/accounts/admin/getToken`, {
            // TODO: findout how to get ENV params on SSR
                method: 'POST',
                mode: 'same-origin',
                body: JSON.stringify({
                    email: email.val(),
                    password: password.val(),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(ans => {
                return ans.json()
            })
            .then(data => {
                if (data.error) return cleanForm(true, data.message)
                return cleanForm(null, data.token)
            })
            .catch(e => {
                console.log(e)
            })
    })
}
