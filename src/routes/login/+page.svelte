<script>
    export let form;
    
    let thisForm;
    let showPassword = false;

    let email;


    $:{if(email && form?.error) email.focus()}
    
    </script>
    
    <div class="login-wrapper">
        <div class="login-content">


            <div class='logo-wrapper'>
                <img class="logo" src="/ConsultingNinja-Logo.png"  alt="consulting ninja logo"/>
            </div>
    
        <form bind:this={thisForm} method="post" action="?/login">

            <div class="form-item">
                <label for="email" >Email<sup><small class="required">*</small></sup></label>
                <input bind:this={email} class:fieldError={form?.error} value={form?.email?? ''} id="email" type="email" name="email" required />
            </div>

            <div class="form-item">
                <label for="password">Password<sup><small class="required">*</small></sup></label>
                <div class="visibility-wrapper">
                    {#if showPassword}
                    <button class="btn-visiblity" type="button" on:click={() => showPassword = false}>
                        <span class="material-symbols-outlined">
                            visibility_off
                        </span>
                    </button>
                    {:else}
                    <button class="btn-visiblity" type="button" on:click={() => showPassword = true}>
                        <span class="material-symbols-outlined">
                        visibility
                        </span>
                    </button>
                    {/if}
                    <input type={showPassword? 'text' : 'password'} id="password" name="password" required />
                </div>

            </div>
        
            <div class="form-item">
            {#if form?.error}
            <small class='error-message'>{form?.message}</small>
            {/if}
            </div>
        
            <div class="form-item">
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <div class="form-item">
                <a class="reset-link" href="/forgotPassword"><small>Forgot Password?</small></a>
            </div>
        
        </form>
    </div>
    </div>
    
    <style>
        div{
            color: #FFF;
            margin-bottom: .5em;
            text-shadow: 0 0 2px #000000;
        }
        label{
            padding-right: .5em;
            text-shadow: 0 0 2px #000000;
        }
        button{
            width: 100%;
            background-color: #FFF;
            transition: all 0.3s ease-in;
        }
        button:hover{
            cursor: pointer;
            text-decoration: underline;
            color: #FFF;
            background-color: #4d4c4c;
            transition: all 0.3s ease-in;
        }
        span{
        color: #ffffff;
        border-radius: 115px;
        }
        span:hover{
            color: rgba(255, 255, 255, 0.7);
        }

        .login-wrapper{
            margin-top:2.5em;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            height: 100vh;
            width:100%;
        }
        .login-content{
            margin-top: 2em;
            max-width: 350px;
            background-color: rgba(0, 0, 0, 0.4);
            padding:1em;
            border-radius: 5px;
        }
        .error-message{
            padding-left: .5em;
            color: #ff0000;
            text-shadow: 0 0 2px #000000;
        }

        .form-item{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .fieldError{
            outline: 2px solid #ff0000;
        }
        .reset-link{
            color: #FFFFFF;
            text-decoration: none;
        }
        .reset-link:hover{
            text-decoration: underline;
        }
        .required{
            padding-left: .5em;
            color: #ff0000;
        }
        .btn-visiblity{
        border-radius: 9999999px;
        background-color: rgba(0, 0, 0, 0);
        border: 0;
        }
        .btn-visiblity:hover{
            background-color: rgba(0, 0, 0, 0);
        }
        .visibility-wrapper{
        display: flex;
        flex-direction: row;
        }
        .logo-wrapper{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

        }
        .logo{
            display: block;
            width: 80px;
            height: auto;
            box-shadow: 0px  0 3px rgba(0, 0, 0, 1.0), 0px 0 5px 6px rgba(0, 0, 0, 0.5), 0px 0 5px 9px rgba(81, 81, 81, 0.3), 0px 0 5px 11px rgba(81, 81, 81, 0.1); 
            border-radius: 50%;
        }
    </style>