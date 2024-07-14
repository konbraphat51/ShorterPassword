# ShorterPass
ShorterPass makes your token (password) **shorter**

Use this to make your crazy long API token to a specific password **without hard-coding** the actual password or token.

> [!CAUTION]
> Of course, this makes the security weaker by making it shorter!!!

## Usage
### Making Open key
- Use this website (totally offline): https://konbraphat51.github.io/PassDiffuser/
- Or you can use [this class](./PassDiffuser.js) locally

**altered text** is your secret password

then you can get base64 open key (**not** reversible to original key or altered password)

### Using the shorter password
- [This class](./PassReverser.js) makes your secret key into the original token
- You can hard-code the **open key** into the constructor, **open key** itself is not reversible
