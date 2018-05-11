# SafeScript

SafeScript is one of the ways to avoid the by-design `<script>` HTML element
vulnerability. Check out [this article][article] to learn more.

Long story short, unlike any other HTML tag, `<script>` implies different rules
of escaping its content. The proper escaping is unreasonably difficult and
can even be impossible under certain circumstances.

The problems with escaping often make the `<script>` element a source of
vulnerabilities.

Instead of following uncertain rules, you can use `<safescript>` which follows
regular HTML escaping rules via HTML entities.

For example, your EJS template could look like this:

```html
<script>
  window.__INITIAL_STATE__ = <%- JSON.stringify(initialState) %>;
</script>
```

Which then makes your HTML look like that:

```html
<script>
  window.__INITIAL_STATE__ = {
    "user": {
      "name": "</script><script>alert(document.location)</script>"
    }
  };
</script>
```

The valid JavaScript code above is not so valid from the HTML specs perspective:
it contains a vulnerability.

With `<safescript>`, you **must** escape every special HTML character with a
respective HTML entity. But once you do it, you can be sure all the script
content will be decoded correctly.

To install SafeScript, simply run:

```bash
$ npm install safescript
```

Then, use `<safescript>` in the same manner as `<script>`:

```html
<script src="./node_modules/safescript/index.js"></script>
<safescript>
  window.__INITIAL_STATE__ = <%= JSON.stringify(initialState) %>;
</safescript>
```

And here is how your actual HTML will look like:

```html
<script src="./node_modules/safescript/index.js"></script>
<safescript>
  window.__INITIAL_STATE__ = {
    &#34;user&#34;: {
      &#34;name&#34;:&#34;&lt;/script&gt;&lt;script&gt;alert(document.location)&lt;/script&gt;&#34;
    }
  };
</safescript>
```

[article]: https://blog.uploadcare.com/vulnerability-in-html-design-the-script-tag-33d24642359e
