import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

df_dice = pd.DataFrame(
    np.random.randint(1, 7, 5000),
    columns=['Hist']
)

# df_dice['Odds'] = df_dice['Hist'] + np.random.randint(1, 7, 5000)
# ax = df_dice.plot.hist(bins=12, alpha=0.5)

# Plot multiple lines in a graph

# df_15 = pd.DataFrame(np.random.randn(1000, 3), index=pd.date_range('1/1/2020', periods=1000), columns=['A', 'B', 'C'])
# df_15 = df_15.cumsum()

# df_15.plot()
# plt.show()

# Bar chart
# pd.DataFrame(np.random.randn(5)).plot.bar()
# plt.show()


# Bar chart with more data
# vals = ['a', 'b', 'c', 'd']
# df_25 = pd.DataFrame(np.random.rand(10,4), columns = vals)
# df_25.plot.bar()
# plt.show()


# x_rng = range(1,15)
# y_vals = [1, 5, 3, 4, 2, 1, 3, 4, 2, 1, 5, 3, 4, 2]

# plt.fill_between(x_rng, y_vals, color="skyblue", alpha=0.2)


# pd.DataFrame(np.random.rand(10, 3), columns=['a', 'b', 'c']).plot.area()

# plt.show()

# pd.DataFrame(np.random.rand(100, 2), columns=['A', 'B']).plot.scatter(x='A', y='B')
# plt.show()


# df_22 = pd.DataFrame(np.random.rand(50, 4), columns=['a', 'b', 'c', 'd'])
# ax = df_22.plot.scatter(x='a', y='b', color='DarkBlue', label='Grp 1')
# df_22.plot.scatter(x='c',y='d', color='orange', label='Grp 2', ax=ax)

# plt.show()

pd.Series(np.random.rand(4), index=['a', 'b', 'c', 'd'], name='Pie').plot.pie(figsize=(6, 6))
plt.show()