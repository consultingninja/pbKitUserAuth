<script>
    import { afterUpdate, onDestroy } from 'svelte';
    export let form;
    
    let showPassword = false;
    let showConfirm = false;
    
    let password = '';
    let confirm = '';

    let email;

    let touched = false;
    let timeoutId;

    $:{if(email && form?.emailUsed) email.focus()}
    $:passError = (password?.length && confirm?.length)? (password !== confirm)? true: false : false;

    function clearFieldError() {
        form.emailUsed = false; // Reset the emailUsed property
    }

    function startTyping() {
        clearTimeout(timeoutId); // Clear any existing timeout
        touched = true;
        timeoutId = setTimeout(clearFieldError, 2000); // Set a new timeout to clear the error after 2 seconds
    }

    afterUpdate(() => {
        email?.addEventListener('input', startTyping); // Add event listener for input changes
    });

    onDestroy(() => {
        clearTimeout(timeoutId); // Clean up the timeout on component destruction
        email?.removeEventListener('input', startTyping); // Remove the event listener
    });


</script>
    
    
    <div class="sign-in-wrapper">
        <div class="sign-in-content">
    
    <div class='logo-wrapper'>
        <img class="logo" src="/ConsultingNinja-Logo.png"  alt="consulting ninja logo"/>
    </div>

    
    <form  method="post" action="?/register">
        <div class="form-item">
            <label for="firstname" >Firstname<sup><small>*</small></sup></label>
            <input value={form?.firstname?? ''} id="firstname" type="text" name="firstname" required />
        </div>
    
        <div class="form-item">
          <label for="lastname" >Lastname<sup><small>*</small></sup></label>
          <input value={form?.lastname?? ''} id="lastname" type="text" name="lastname" required />
      </div>
    
      <div class="form-item">
          <label for="email" >Email<sup><small>*</small></sup></label>
          <input bind:this={email} class:fieldError={form?.emailUsed} value={form?.email?? ''} id="email" type="email" name="email" required />
      </div>
    
        <div class="form-item">
            <label for="password">Password<sup><small>*</small></sup></label>
            <div class="visibility-wrapper">
            {#if !showPassword}
                <button class="btn-visiblity" type="button" on:click={() => showPassword = true}>
                    <span class="material-symbols-outlined">
                    visibility_off
                    </span>
                </button>
                <input bind:value={password} class:fieldError={form?.weakPassword || passError} type='password' id="password" name="password" required />
            {:else}
                <button class="btn-visiblity" type="button" on:click={() => showPassword = false}>
                    <span class="material-symbols-outlined">
                        visibility
                    </span>
                </button>
                <input bind:value={password} class:fieldError={form?.weakPassword || passError} type='text' id="password" name="password" required />
            {/if}
    
            </div>  
        </div>
    
        <div class="form-item">
            <label for="confirmPassword">Confirm Password<sup><small>*</small></sup></label>
            <div class="visibility-wrapper">
            {#if !showConfirm}
                <button class="btn-visiblity" type="button" on:click={() => showConfirm = true}>
                    <span class="material-symbols-outlined">
                    visibility_off
                    </span>
                </button>
                <input bind:value={confirm} class:fieldError={form?.weakPassword || passError} type='password' id="confirmPassword" name="confirmPassword" required />
            {:else}
                <button class="btn-visiblity" type="button" on:click={() => showConfirm = false}>
                    <span class="material-symbols-outlined">
                        visibility
                    </span>
                </button>
                <input bind:value={confirm} class:fieldError={form?.weakPassword || passError} type='text'  id="confirmPassword" name="confirmPassword" required />
            {/if}
    
        </div>
        </div>
    
        <div class="form-item">
            <label for="username">Username<small class="nospace">(no spaces)</small></label>
            <input value={form?.username?? ''} type="text" id="username" name="username" />
        </div>
    
        <div class="form-item">
        {#if passError}
        <small>Passwords do not match!</small>
        {/if}
    
        {#if form?.error}
        <small>{form?.message}</small>
        {/if}
        </div>
    
        <div class="form-item">
            <button disabled={passError} type="submit" class="btn btn-primary">Sign Up</button>
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
        }
        small{
            padding-left: .5em;
            color: #ff0000;
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
        input{
            min-width: 175px;
        }
        .sign-in-wrapper{
            margin-top:2.5em;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            height: 100vh;
            width:100%;
            
        }
        .sign-in-content{
            margin-top: 2em;
            max-width: 400px;
            background-color: rgba(0, 0, 0, 0.4);
            padding:1em;
            border-radius: 5px;
        }
        .form-item{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .fieldError{
            outline: 2px solid #ff0000;
        }
        .sign-in-wrapper{
            height: 100vh;
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
        .nospace{
            color:#FFFFFF;
        }


    </style>