import pandas as pd 
import numpy as np
import sys

arr_4 = np.random.randint(10, 15, size=(2, 3))

df_8 = pd.DataFrame(arr_4, columns=['a', 'b', 'c'])

print("df_8: ")
print(df_8)

print("\ndf_8 using sort_index(ascending=False)")
print(df_8.sort_index(ascending=False))

print("\ndf_8 using sort_values(by='a')")
print(df_8.sort_values(by='a'))

# Passing Data to Function!

def get_profit_totals(df):
    profit_series = df['Profit']
    print(f"Total Profit: {profit_series.sum()}")


cs_df = pd.read_csv('csv/ComputerSales.csv')
print("Passing Df to function")
get_profit_totals(cs_df)


def split_name(df):
    def get_names(full_name):
        f_name, l_name = full_name.split()
        return pd.Series((f_name, l_name), index=['First Name', 'Last Name'])
    
    names = df['Contact'].head().apply(get_names)
    df[names.columns] = names
    return df

print("\nSplitting names: ")
print(split_name(cs_df).head())

def create_age_groups(df):
    bins = [0, 30, 50, sys.maxsize]
    labels = ['<30', '30-50', '50+']
    age_group = pd.cut(df['Age'], bins=bins, labels=labels)
    df['Age Group'] = age_group
    return df

print("\nCreating age groups using bins, lables, and cut: ")
cs_cut = create_age_groups(cs_df)
print(cs_cut.head())

print("\nUsing Pipes: ")
print(cs_df.pipe(split_name).pipe(create_age_groups).head())
