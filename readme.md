# SafeScript

Unlike any other HTML tags, `<script>` has different rules of escaping
of its content. Correct escaping is unreasonably difficult,
and under some circumstances is impossible.
This very often makes the `<script>` tag a source of vulnerabilities.
Read the [full article about this][article].

Instead of following uncertain rules you can use `<safescript>`,
which follows regular HTML escaping rules, using HTML entities.

For example, your EJS template could look like this:

```html
<script>
  window.__INITIAL_STATE__ = <%- JSON.stringify(initialState) %>;
</script>
```

and your HTML will look like this:

```html
<script>
  window.__INITIAL_STATE__ = {
    "user": {
      "name": "</script><script>alert(document.location)</script>"
    }
  };
</script>
```

This valid Javascript code is not valid from HTML specs point of view
and contains a vulnerability.

With `<safescript>` you **must** escape every HTML special character with
HTML entities. But once you do this you could be sure that script content
will be decoded correctly.

```html
<safescript>
  window.__INITIAL_STATE__ = <%= JSON.stringify(initialState) %>;
</safescript>
```

```html
<safescript>
  window.__INITIAL_STATE__ = {
    &#34;user&#34;: {
      &#34;name&#34;:&#34;&lt;/script&gt;&lt;script&gt;alert(document.location)&lt;/script&gt;&#34;
    }
  };
</safescript>```

[article]: https://blog.uploadcare.com/vulnerability-in-html-design-the-script-tag-33d24642359e
