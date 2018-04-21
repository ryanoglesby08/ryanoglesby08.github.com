---
title: Fun With Rails I18n
date: "2013-01-29T20:00:00.000Z"
---

## Skipping the Basics...

Anyone wanting to develop a truly internationalized application needs to address translating the
text of the app into the supported languages. Fortunately for you Rails devs out there, the
framework provides an easy mechanism for managing and performing those translations, I18n.translate
or shortly I18n.t being the forefront. I am just going to mention the basics here and then move
right on to some of the more fun features of Rails translations that every Rails ninja needs to
know.

So we all know how to do basic translations:

```yaml
en:
  hello-world: 'Oh hai, World, you are looking nice'
  views:
    welcome: 'Welcome, %{user_name}'
```

```ruby
t('hello-world')  # Oh hai, World, you are looking nice
t('views.welcome', user_name: 'OptimusPrime')  # Welcome, OptimusPrime
```

Now some things you may not know about.

## Pluralization

When you do translations you don't have to try to hack together interpolated strings using
`ActiveSupport#pluralize`. Pluralizations are baked right in.

```yaml
en:
  views:
    messages:
      zero: 'You got no messages here fool!'
      one: 'Only 1 message right now.'
      other: 'You have %{count} messages.'
```

```ruby
t('views.messages', count: 0)  # You got no messages here fool!
t('views.messages', count: 1)  # Only 1 message right now.
t('views.messages', count: 5)  # You have 5 messages.
```

## HTML Safe

As a general rule, I avoid putting HTML markup in a translation string. HTML markup should be in the
view where it belongs. However, despite my best efforts, sometimes it is unavoidable - which is okay
in certain situations. Furthermore, sometimes the variables passed into a translation will contain
HTML markup. The default strategy in this situation that I have seen is to use `raw` or `html_safe`.
While this does the job, it adds unnecessary method calls when the HTML safe-ification can be
handled directly by I18n using the `_html` suffix.

```yaml
en:
  views:
    account-will-be-locked_html: 'Your account is about to be <strong>locked</strong>'
    remaining-characters:
      html: 'Remaining characters: %{amount}'
```

```ruby
t('views.account-will-be-locked_html')  # 'Your account is about to be <strong>locked</strong>' (marked HTML safe for the view)
t('views.remaining-characters.html', amount: '<em>50</em>')  # 'Remaining characters: <em>50</em>' (marked HTML safe for the view)
```

Though you do receive the added benefit of avoiding unnecessary `html_safe` calls, the real winner
here it that by being explicit in the locale file, you tell any other developers looking at it which
strings are expected to have HTML. Easy win for visibility and communication.

## Watch Out for yes/no!

This is a weird one. I am actually not sure why this happens, and would appreciate if anyone can
shed some light on the underlying reason for this. If you try to use the key "yes" or "no," I18n.t
will not be able to find it.

```yaml
en:
  views:
    yes: 'Sure thing'
    no: 'No way!'
```

```ruby
t('views.yes')  # <span class="translation_missing" title="translation missing: en.views.yes">Yes</span>
t('views.no')  # <span class="translation_missing" title="translation missing: en.view.yes">No</span>
```

Only solution I know is just to not use "yes" or "no" as keys, which is not ideal if you are adding
a translation for those exact words.

## Literal Naming FTW

It can be quite tempting to use semantic keys in your locale YML files. I see things like "title,"
"introduction-1," or "header-text." While this will work fine, I prefer to use literal keys that
reflect the actual content of the translation (in the default locale) so my views are easier to read
for myself and other developers.

```haml
- # Hard to read. I have to jump out of my code just to read my own code! Ergggggghhhh
.header
  = t('views.header.user-intro', user: @current_user)

.main-content
  %p
    = t('views.common.site-description-1')
  %p
    = t('views.common.site-description-2')

  %ul
    %li
      = t('views.common.user-perks-1')
```

```haml
- # Easy to read. I understand my own code. Yessssssssss
.header
  = t('views.header.welcome-to-the-site', user: @current_user)

.main-content
  %p
    = t('views.common.we-have-doo-dads')
  %p
    = t('views.common.and-foo-bar-widgets')

  %ul
    %li
      = t('views.common.receive-service-any-time')
```

That's all for now! Most of this plus everything else you wanted to know about i18n can be found in
the [Rails Guides](http://guides.rubyonrails.org/i18n.html).

Bye! Adios! Adieu! Aloha!
