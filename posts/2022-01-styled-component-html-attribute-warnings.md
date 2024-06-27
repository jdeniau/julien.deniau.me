---
date: 2022-01-18
title: Styled-component and HTML attribute warning
emphasis: Simple fix to React HTML warning with styled-component
icon: code
lang: en
---

If you are using styled-component, you might have warning in the console:

> Warning: Received `true` for a non-boolean attribute `primary`.
>
> If you want to write it to the DOM, pass a string instead: primary="true" or primary={value.toString()}.

See the following example:

<iframe src="https://codesandbox.io/embed/styled-component-transient-props-example-1fr1p?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Styled-component transient props example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   
The styled-component FAQ solves this by [using an adapter that destructured unwanted props](https://styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings).

It does work but adds a real complexity in your code.

Since styled-component 5.1, you can in fact use the [transient props](https://styled-components.com/docs/api#transient-props) to fix this issue.

The only thing that you need is to change the prop `primary` to `$primary` (with a leading `$`), then the prop will not be passed down to the child component:

<iframe src="https://codesandbox.io/embed/styled-component-transient-props-example-fixed-lhk7m?expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Styled-component transient props example fixed"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>


In practice, this helps me cleaning the following code:
 
 ```diff
- /* eslint-disable @typescript-eslint/no-unused-vars,  react/jsx-props-no-spreading */
- type CardProps = Parameters<typeof MpdCard>[0];
- const CleanedCard = ({
-   isSubscription,
-   ...rest
- }: CardProps & { isSubscription: boolean }) => <MpdCard {...rest} />;
- /* eslint-enable */
- 
- const Card = styled(CleanedCard)<{ isSubscription: boolean }>`
+ const Card = styled(MpdCard)<{ $isSubscription: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px 25px;
  min-height: 82px;
  border-left: 5px solid
- ${(props) => (props.isSubscription ? $alertYellow : $defaultWhite)};
+ ${(props) => (props.$isSubscription ? $alertYellow : $defaultWhite)};

// …

- <Card isSubscription />
+ <Card $isSubscription />

```

I opened [a pull request](https://github.com/styled-components/styled-components-website/pull/832) to upgrade the FAQ on the subject.

