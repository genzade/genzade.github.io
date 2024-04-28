---
layout: post
title: Using Turbo in Jekyll not rails
date: 2024-04-28 01:55 +0100
toc: true
tags: turbo jekyll
---

If you have had some exposure to the [hotwired turbo framework](https://turbo.hotwired.dev/){:target="\_blank"},
then you already know how awesome it is. I recently found out exactly how easy
it can be to use it outside of [Ruby on Rails](https://rubyonrails.org/){:target="\_blank"},
and in this article, I will run through how I implemented it on my own
[Jekyll](https://jekyllrb.com/){:target="\_blank"} single page application site.

# Introduction

In this article I will document how I fixed an issue I was having in my site.
I have a page with all articles (my blog posts) and a page with all
the generated tags (article tags or categories). The articles are displayed in
the articles page and when you click on an article you are redirected to a page
to read that article. When you click the on an tag in the tags page it will take
you to another page with all article links that correspond to that tag.

[😏](https://www.urbandictionary.com/define.php?term=No%20Shit%20Sherlock) great!
So what's the problem?

This may seem pretty straightforward but in my opinion not the best user experience.
What is the point of having two separate pages where the user can pick articles to
read? One with all articles and one where they are sorted by their respective tags.
I thought why not combine the two pages together and show the user everything on
one page.

## Prerequisites

This article assumes you have some working knowledge of [Jekyll](https://jekyllrb.com/){:target="\_blank"}
and some basic HTML and CSS. It may also help to know some [TailwindCSS](https://tailwindcss.com/){:target="\_blank"},
though I will be omitting a lot of the classes in the code snippets just for brevity,
and they are not the focus of this article. If you do want to check out how the pages
are styled, feel free to check out the [GitHub repo](https://github.com/genzade/genzade.github.io){:target="\_blank"}.

# The Problem

The current structure of my site is as follows;

I have a tag page with the following code;

`_pages/tags/index.html`

```html {% raw %}
---
layout: default
permalink: /tags
---

{% assign sorted_tags = site.tags | sort %}

<div class="tag-container ...">
  {% for tag in sorted_tags %} {% assign tagName = tag | first | downcase %}
  <a href="{{ site.baseurl }}/tags/{{ tagName }}">
    <button class="h-12 w-auto text-xl">
      {% assign postsCount = tag | last | size %}
      <h1 class="text-black">{{ tagName }} ({{ postsCount }})</h1>
    </button>
  </a>
  {% endfor %}
</div>
{% endraw %}```

This page just displays all the tags as a link/button to each of tag page which
displays all the articles that have that tag. This is the code for the individual
tag page;

`_layouts/tag_page.html`

```html {% raw %}
---
layout: default
---

<div class="tag-container ... mx-auto">
  <a href="{{ site.baseurl }}/tags/{{ page.tag }}">
    <button class="h-14 w-auto !text-2xl !font-extrabold">
      <h1 class="text-black">{{ page.tag }}</h1>
    </button>
  </a>
</div>

{% include articles-container.html posts=page.posts %}
{% endraw %}```

I want to combine these to pages into one page. A page that has a "tags cloud" where you
can click one of them all the corresponding articles below it. There will be a
button called "all" which when you click it all of the articles will appear.

# The Solution

It seemed obvious to me that the first step was to place both the
contents of the `tag_page` and the tag index on one page. One could click on the
tags at the top of the page, and the bottom of the page would update with the
articles based on the clicked tag. That's the goal, so that's where I'm starting
from.

Though there are a few ways this can be achieved, I only experimented with
a couple.

## Using JQuery

The first thing i tried was to use [JQuery](https://jquery.com/){:target="\_blank"}.
This seemed like the simple solution at first because you could use the
[DOM](https://www.w3schools.com/js/js_htmldom.asp){:target="\_blank"} to
manipulate what the user sees.

To be honest, I began to write the code for this and quickly realised it was
getting a bit messy. And even though I got a
(somewhat) working solution, I was already feeling a bit icky about how I
achieved it. I won't share that code here becuase it was far from pretty and
let's face it, if you are reading this that is not what you came here to see.

But I was thinking there must be an easier way to do this.

And there was.

## Enter Turbo

> [Turbo Frames allow predefined parts of a page to be updated on
request. Any links and forms inside a frame are captured, and the frame contents
automatically updated after receiving a
response](https://turbo.hotwired.dev/handbook/frames){:target="\_blank"}.

Perfect, that sounds like what I need.

### Install turbo in Jekyll

First I tried to install it with [yarn](https://yarnpkg.com/){:target="\_blank"} by running;

```shell
$ yarn add @hotwired/turbo
````

But was getting this error `SyntaxError: Cannot use import statement outside a module`.

After some digging around I stumbled upon a solution from [this issue](https://github.com/hotwired/turbo/issues/18){:target="\_blank"}
where they recommended using [unpkg](https://unpkg.com/){:target="\_blank"}, so I imported it like so;

```diff {% raw %}
     <title>{{ site.title }} {% if page.title %} - {{ page.title }} {% endif %}</title>
     <link rel="stylesheet" href="{{ "/assets/css/main.css" | absolute_url }}">
     <link rel="icon" type="image/x-icon" href="{{site.baseurl}}/assets/images/favicon.svg" />
+    <script src="https://unpkg.com/@hotwired/turbo@7.1.0/dist/turbo.es2017-umd.js"></script>
     {% if page.layout == "post" %}
     <script src="{{ "/assets/js/article/toc-marker.js" | absolute_url }}" defer></script>
     {% endif %}
{% endraw %}```

It now seems like turbo is working properly in the site (no errors after build, so good!).

### Using Turbo in Jekyll

Ok, now we need to combine those pages into one.

Lets start using turbo

We can copy the "tag cloud" from `_pages/tags/index.html` into `/_layouts/tag_page.html`
and we can wrap the `articles-container` in a turbo-frame tag like so;

```html {% raw %}
---
layout: default
---

{% assign sorted_tags = site.tags | sort %}

<div class="tag-container mx-auto ...">
  {% for tag in sorted_tags %} {% assign tagName = tag | first | downcase %}
  <a href="{{ site.baseurl }}/tags/{{ tagName }}">
    <button class="h-12 w-auto text-xl">
      {% assign postsCount = tag | last | size %}
      <h1 class="text-black">{{ tagName }} ({{ postsCount }})</h1>
    </button>
  </a>
  {% endfor %}
</div>

<turbo-frame id="main_frame">
  {% include articles-container.html posts=page.posts %}
</turbo-frame>
{% endraw %}```

Now when you click on the tags in the tag cloud the corresponding articles will appear below it.

There is a small problem here now in that the articles only appear when a tag is clicked in the tag cloud.

The fix for this is easy, we can just add the `articles-container` in `_pages/tags/index.html`;

```html {% raw %}
---
layout: default
permalink: /tags
---

{% assign sorted_tags = site.tags | sort %}

<div class="tag-container mx-auto ...">
  {% for tag in sorted_tags %} {% assign tagName = tag | first | downcase %}
  <a href="{{ site.baseurl }}/tags/{{ tagName }}">
    <button class="h-12 w-auto text-xl">
      {% assign postsCount = tag | last | size %}
      <h1 class="text-black">{{ tagName }} ({{ postsCount }})</h1>
    </button>
  </a>
  {% endfor %}
</div>

{% include articles-container.html posts=site.posts %}
{% endraw %}```

Now all the articles will be shown on the tag page by default.

Next we should take care of another UI issue. When you click on the tag in the
tag cloud there should be some visual feedback indicating which tag article we
are currently displaying.

For this we just need to change the button colour of the tag that corresponds
to the current tag page. For this I decided to just use [Liquid templating](https://liquidjs.com/tutorials/intro-to-liquid.html){:target="\_blank"}
to assign an `active_class` and just add it to the button class to override
the colour. Something like this;

```html {% raw %}
<!-- on this page we have access to tagName -->
{% if page.url contains tagName %}
  <!-- the `!` TailwindCSS, to override classes -->
  {% assign active_class = '!bg-green-200' %}
{% else %} {% assign active_class = '' %} {% endif %}
  <button class="{{ active_class }} h-12 w-auto text-xl">
    <!-- active_class interpolated here -->
  </button>
{% endraw %}```

# Wrapping up

Finally to wrap everything up here, we should do some refactoring. I noticed that
the "tag cloud" code is now duplicated in two places, we can fix this by using a
partial like so.

`_pages/tags/index.html`

```diff {% raw %}
   ---
   layout: default
   permalink: /tags
   ---

   {% assign sorted_tags = site.tags | sort %}

-  <div class="tag-container mx-auto flex items-center justify-center px-10">
-    {% for tag in sorted_tags %} {% assign tagName = tag | first | downcase %}
-    <a href="{{ site.baseurl }}/tags/{{ tagName }}">
-      <button class="h-12 w-auto text-xl">
-        {% assign postsCount = tag | last | size %}
-        <h1 class="text-black">{{ tagName }} ({{ postsCount }})</h1>
-      </button>
-    </a>
-    {% endfor %}
-  </div>
+  {% include tag-cloud.html %}

   {% include articles-container.html posts=site.posts %}
{% endraw %}```

`_layouts/tag_page.html`

```diff {% raw %}
  ---
  layout: default
  ---

-  {% assign sorted_tags = site.tags | sort %}
-
-  <div class="tag-container mx-auto flex items-center justify-center px-10">
-    {% for tag in sorted_tags %} {% assign tagName = tag | first | downcase %}
-    <a href="{{ site.baseurl }}/tags/{{ tagName }}">
-      {% if page.url contains tagName %}
-        {% assign active_class = '!bg-green-200' %}
-      {% else %}
-        {% assign active_class = '' %}
-      {% endif %}
-
-      <button class="{{ active_class }} h-12 w-auto text-xl">
-        {% assign postsCount = tag | last | size %}
-        <h1 class="text-black">{{ tagName }} ({{ postsCount }})</h1>
-      </button>
-    </a>
-    {% endfor %}
-  </div>
+  {% include tag-cloud.html %}

  <turbo-frame id="main_frame">
    {% include articles-container.html posts=page.posts %}
  </turbo-frame>
{% endraw %}```

The new partial file `/_includes/tag-cloud.html` looks like this;

```html {% raw %}
<div class="tag-container mx-auto ...">
  {% for tag in sorted_tags %} {% assign tagName = tag | first | downcase %}
  <a href="{{ site.baseurl }}/tags/{{ tagName }}">
    {% if page.url contains tagName %}
      {% assign active_class = '!bg-green-200' %}
    {% else %}
      {% assign active_class = '' %}
    {% endif %}

    <button class="{{ active_class }} h-12 w-auto text-xl">
      {% assign postsCount = tag | last | size %}
      <h1 class="text-black">{{ tagName }} ({{ postsCount }})</h1>
    </button>
  </a>
  {% endfor %}
</div>
{% endraw %}```

## One final Gotcha!

Within my articles-container partial, I have links to the posts, but since they
are wrapped in a turbo-frame, those links would not work. The response to the
turbo-frame request must contain the same ID as the turbo-frame that sent it
(see [this stack overflow post](https://stackoverflow.com/questions/69712616/hotwire-turbo-does-not-replace-turbo-frame-throws-warning-response-has-no-matc){:target="\_blank"}).

```html {% raw %}
<turbo-frame id="main_frame">
  {% include articles-container.html posts=page.posts %}
</turbo-frame>
{% endraw %}```

Since I do not want my article pages themselves to be replaced in the frame or,
for that matter, have anything to do with turbo frames for the moment a way around
this is to just disable turbo on those links to the articles with `data-turbo="false"`.

This fixed the issue.
