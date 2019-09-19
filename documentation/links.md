## Example Pages

| Filename | Resulting URL |
|----------|---------------|
| departments/recreation/index.md | www.rutherfordboronj.com/departments/recreation/ |
| departments/recreation/events.md | www.rutherfordboronj.com/departments/recreation/events/ |
| departments/recreation/forms.md | www.rutherfordboronj.com/departments/recreation/forms/ |
| committees/index.md | www.rutherfordboronj.com/committees/ |

## Example Links

### When to start without special characters

When editing `departments/recreation/index.md`, if you wanted to link to `departments/recreation/events.md`, the link would be `events/` because you're adding `events/` to the URL. You do this when the page you are linking to is deeper in the URL structure than the page you are editing.

### When to start with ../

When editing `departments/recreation/events.md`, if you wanted to link to `departments/recreation/forms.md`, the link would be `../forms/`. You can think of the `../` part to mean **remove everything up until the previous /**.

When editing `departments/recreation/events.md`, if you wanted to link to `departments/recreation/index.md`, the link would be `../`.

### When to start with /

Starting a link with a `/` should be used when you are linking to an entirely different section of the site. Take for example linking from `departments/recreation/forms.md` to `committees/index.md`. The following two links result in the same thing:

* `/committees/`
* `../../../committees/`

The former reads significantly easier than the later. The former is **always** a viable way to link to things. Another way the first example could be linked is to use the link `/departments/recreation/events/`.

The reason the later works is because it's saying "remove three folders of the URL above me, then go down into the committee folder".
